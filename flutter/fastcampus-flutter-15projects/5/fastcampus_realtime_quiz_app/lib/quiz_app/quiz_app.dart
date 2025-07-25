import 'dart:async';
import 'dart:convert';

import 'package:fastcampus_realtime_quiz_app/main.dart';
import 'package:fastcampus_realtime_quiz_app/model/problem.dart';
import 'package:fastcampus_realtime_quiz_app/model/quiz.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';

class QuizPage extends StatefulWidget {
  final String quizRef;
  final String name;
  final String uid;
  final String code;

  const QuizPage({
    super.key,
    required this.quizRef,
    required this.code,
    required this.name,
    required this.uid,
  });

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  DatabaseReference? quizStateRef;
  List<Problems> problemsSets = [];
  List<Map<String, int>> problemTriggers = [];

  String quizStatePath = "quiz_state";
  String quizDetailPath = "quiz_detail";

  bool isDone = false;
  List<String> quizResult = [];


  fetchQuizInformations() {
    quizStateRef = database?.ref("$quizStatePath/${widget.quizRef}");
    final quizDetailRef = database?.ref("$quizDetailPath/${widget.quizRef}");
    quizDetailRef?.get().then((value) {
      final obj = jsonDecode(jsonEncode(value.value));
      final quizDetail = QuizDetail.fromJson(obj);

      quizDetail.problems?.forEach((element) {
        problemsSets.add(element);
      });
      quizStateRef?.child("triggers").get().then((value) {
        for (var element in value.children) {
          final trigger = element.value as Map;
          problemTriggers.add({
            "start": trigger["start"],
            "end": trigger["end"],
          });
        }
      });

      quizStateRef?.child("user").push().set({
        "uid": widget.uid,
        "name": widget.name,
      });
    });
  }

  Future calcResult() async {
    if (!isDone) {
      isDone = true;
      final result = await quizStateRef?.child("solve").once();
      // 사용자 별칭 별 스코어 저장 맵
      Map<String, double> countMap = {};

      result?.snapshot.children.toList().forEach((element) {
        final elements = element.children.toList();
        elements.sort((a, b) {
          final aa = a.value as Map;
          final bb = b.value as Map;
          final aTime = aa["timestamp"] as int;
          final bTime = bb["timestamp"] as int;
          return aTime.compareTo(bTime);
        });

        for (var i = (elements.length - 1); i >= 0; i--) {
          final element2 = elements[i];
          final elementMap = element2.value as Map;
          double score = elementMap["correct"] ? (20 + i) / 1000 : 0;
          if (countMap.containsKey("${elementMap["name"]}")) {
            countMap["${elementMap["name"]}"] =
                (countMap["${elementMap["name"]}"] ?? 0) + 1.00 + (score);
          } else {
            countMap["${elementMap["name"]}"] = 1.00 + (score);
          }
        }
      });
      var sortedKeys = countMap.keys.toList(growable: false)
        ..sort((k1, k2) => countMap[k2]!.compareTo(countMap[k1]!));

      setState(() {
        quizResult = sortedKeys;
      });
    }
  }

  @override
  void initState() {
    super.initState();
    fetchQuizInformations();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("${widget.name} (코드: ${widget.code})"),
      ),
      body: Stack(
        children: [
          Positioned.fill(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('참가자'),
                  Expanded(
                    child: StreamBuilder(
                      stream: quizStateRef?.child("/user").onValue,
                      builder: (BuildContext context,
                          AsyncSnapshot<DatabaseEvent> snapshot) {
                        if (snapshot.hasData) {
                          final items =
                              snapshot.data?.snapshot.children.toList() ?? [];

                          return ListView.builder(
                            itemCount: items.length,
                            itemBuilder: (context, index) {
                              final item = items[index].value as Map;
                              return ListTile(
                                title: Text("${item["name"]}"),
                                subtitle: Text("${item["uid"]}"),
                              );
                            },
                          );
                        }
                        return const Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Center(
                              child: CircularProgressIndicator(),
                            ),
                            Text("참가자 확인중...")
                          ],
                        );
                      },
                    ),
                  ),
                  const Divider(),
                  const Text('퀴즈시작상태'),
                  Expanded(
                    child: StreamBuilder(
                      stream: quizStateRef?.child("state").onValue,
                      builder:
                          (context, AsyncSnapshot<DatabaseEvent> snapshot) {
                        if (snapshot.hasData) {
                          print(snapshot.data?.snapshot.value);
                          final state = snapshot.data?.snapshot.value as bool;
                          return Center(
                            child: Column(
                              children: [
                                Text(
                                  switch (state) {
                                    true => "시작!",
                                    false => "대기중"
                                  },
                                  style: const TextStyle(
                                    fontSize: 32,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                          );
                        }
                        return const Center(
                          child: CircularProgressIndicator(),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
          Positioned.fill(
            child: StreamBuilder(
              stream: quizStateRef?.onValue,
              builder: (BuildContext context,
                  AsyncSnapshot<DatabaseEvent> snapshot) {
                if (snapshot.hasData) {
                  int currentIndex = 0;
                  Map snapshotData = snapshot.data?.snapshot.value as Map;
                  final state = snapshotData["state"] as bool;
                  if (snapshotData.containsKey("current")) {
                    currentIndex = snapshotData["current"] as int;
                  }
                  problemTriggers.clear();
                  if (snapshotData.containsKey("triggers")) {
                    for (var element in snapshotData["triggers"]) {
                      final trigger = element as Map;
                      problemTriggers.add({
                        "start": trigger["start"],
                        "end": trigger["end"],
                      });
                    }
                  }
                  if (state) {
                    if (currentIndex < problemsSets.length) {
                      return Container(
                        color: Colors.white,
                        child: _ProblemSolveWidget(
                          index: currentIndex,
                          ref: quizStateRef!,
                          problems: problemsSets[currentIndex],
                          startTime:
                              problemTriggers[currentIndex]["start"] ?? 0,
                          endTime: problemTriggers[currentIndex]["end"] ?? 0,
                          uid: widget.uid,
                          name: widget.name,
                        ),
                      );
                    } else {
                      calcResult();
                      return Container(
                        color: Colors.white,
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "퀴즈 종료",
                            ),
                            const Divider(),
                            const Text("순위"),
                            Expanded(
                              child: ListView.separated(
                                itemBuilder: (context, index) {
                                  return ListTile(
                                    leading: CircleAvatar(
                                      child: Text("${index + 1}위"),
                                    ),
                                    title: Text(quizResult[index]),
                                  );
                                },
                                separatorBuilder:
                                    (BuildContext context, int index) =>
                                        const Divider(),
                                itemCount: quizResult.length,
                              ),
                            )
                          ],
                        ),
                      );
                    }
                  }
                }

                return const Center(
                  child: CircularProgressIndicator(),
                );
              },
            ),
          )
          
        ],
      ),
    );
  }
}

class _ProblemSolveWidget extends StatefulWidget {
  final DatabaseReference ref;
  final Problems problems;
  final String uid;
  final String name;
  final int startTime;
  final int endTime;
  final int index;

  const _ProblemSolveWidget({
    super.key,
    required this.index,
    required this.ref,
    required this.problems,
    required this.startTime,
    required this.endTime,
    required this.name,
    required this.uid,
  });

  @override
  State<_ProblemSolveWidget> createState() => _ProblemSolveWidgetState();
}

class _ProblemSolveWidgetState extends State<_ProblemSolveWidget> {
  Timer? timer;

  int leftTime = 0;
  int readyTime = 0;

  bool isStart = false;
  bool isSubmit = false;

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  refresh() {
    if (mounted) {
      setState(() {});
    }
  }

  Future periodicTask() async {
    final startTime = DateTime.fromMillisecondsSinceEpoch(widget.startTime);
    final endTime = DateTime.fromMillisecondsSinceEpoch(widget.endTime);

    timer ??= Timer.periodic(const Duration(seconds: 1), (t) {
      DateTime nowDatetime = DateTime.now();
      final sDiff = nowDatetime.difference(startTime);
      final eDiff = endTime.difference(nowDatetime);

      readyTime = sDiff.inSeconds;
      leftTime = eDiff.inSeconds;

      if (sDiff.inSeconds >= 0) {
        isStart = true;
      }

      if (eDiff.inSeconds <= 0) {
        int nextIndex = widget.index + 1;
        widget.ref.child("current").set(nextIndex);
        timer?.cancel();
        timer = null;
        isStart = false;
        isSubmit = false;
      }
      refresh();
    });
  }

  @override
  Widget build(BuildContext context) {
    periodicTask();
    return switch (isStart) {
      true => Column(
          children: [
            Text(
              "문제",
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            Text(
              "${widget.problems.title}",
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            Expanded(
              child: isSubmit
                  ? Text(
                      "제출 완료",
                      style: Theme.of(context).textTheme.headlineMedium,
                    )
                  : GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                      ),
                      itemCount: widget.problems.options?.length,
                      itemBuilder: (context, index) {
                        final item = widget.problems.options?[index];
                        return GestureDetector(
                          onTap: () async {
                            final result = await widget.ref
                                .child("solve/${widget.index}")
                                .push()
                                .set(
                              {
                                "name": widget.name,
                                "uid": widget.uid,
                                "answer": item,
                                "correct": widget.problems.answerIndex == index
                                    ? true
                                    : false,
                                "timestamp":
                                    DateTime.now().millisecondsSinceEpoch,
                              },
                            );
                            setState(() {
                              isSubmit = true;
                            });
                          },
                          child: Card(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.center,
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Text(
                                  "${index + 1} 번",
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 24,
                                  ),
                                ),
                                Text(
                                  "$item",
                                  style: const TextStyle(fontSize: 24),
                                )
                              ],
                            ),
                          ),
                        );
                      },
                    ),
            ),
            Text(
              "$leftTime초",
              style: const TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 42,
              ),
            )
          ],
        ),
      false => Container(
          child: widget.index > 0
              ? Column(
                  children: [
                    const Text("곧 다음 퀴즈가 시작됩니다."),
                    Expanded(
                        child: StreamBuilder(
                      stream: widget.ref
                          .child("solve/${widget.index - 1}")
                          .orderByChild("timestamp")
                          .onValue,
                      builder: (BuildContext context,
                          AsyncSnapshot<DatabaseEvent> snapshot) {
                        if (snapshot.hasData) {
                          final items =
                              snapshot.data?.snapshot.children.toList() as List;
                          return ListView.separated(
                            itemBuilder: (context, index) {
                              final snapshot = items[index] as DataSnapshot;
                              final item = snapshot.value as Map;
                              return ListTile(
                                leading: CircleAvatar(
                                  child: Text("${index + 1} 위"),
                                ),
                                title: Text("${item["name"]}"),
                                trailing: item["correct"]
                                    ? const Icon(Icons.check_circle_outline,
                                        color: Colors.green)
                                    : const Icon(Icons.clear,
                                        color: Colors.red),
                                subtitle: Text(
                                    "${DateTime.fromMillisecondsSinceEpoch(item["timestamp"])}"),
                              );
                            },
                            separatorBuilder: (context, _) => const Divider(),
                            itemCount: items.length,
                          );
                        }
                        return const CircularProgressIndicator();
                      },
                    )),
                    Text(
                      "${readyTime * -1}",
                      style: Theme.of(context).textTheme.displayLarge,
                    )
                  ],
                )
              : Column(
                  children: [
                    const Text("대기중\n곧 퀴즈가 시작됩니다. "),
                    Expanded(child: Container()),
                    Text(
                      "${readyTime * -1}",
                      style: Theme.of(context).textTheme.displayLarge,
                    )
                  ],
                ),
        ),
    };
  }
}
