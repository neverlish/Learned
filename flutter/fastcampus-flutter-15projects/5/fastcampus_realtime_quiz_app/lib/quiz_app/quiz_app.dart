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
          )
        ],
      ),
    );
  }
}
