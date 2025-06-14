import 'dart:convert';
import 'dart:math';

import 'package:fastcampus_realtime_quiz_app/main.dart';
import 'package:fastcampus_realtime_quiz_app/model/quiz.dart';
import 'package:fastcampus_realtime_quiz_app/web/quiz_bottom_sheet_widget.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class QuizManagerPage extends StatefulWidget {
  const QuizManagerPage({super.key});

  @override
  State<QuizManagerPage> createState() => _QuizManagerPageState();
}

class _QuizManagerPageState extends State<QuizManagerPage> {
  String? uid;
  List<QuizManager> quizItems = [];

  List<Quiz> quizList = [];

  signInAnonymously() {
    FirebaseAuth.instance.signInAnonymously().then((value) => {
          setState(() {
            uid = value.user?.uid;
          })
        });
  }

  generateQuiz() async {
    if (quizItems.isEmpty) {
      return;
    }
    final pinCode = Random().nextInt(999999).toString().padLeft(6);
    final quizRef = database!.ref("quiz");
    final quizDetailRef = database!.ref("quiz_detail");
    final quizStateRef = database!.ref("quiz_state");

    final newQuizDetailRef = quizDetailRef.push();
    newQuizDetailRef.set({
      "code": pinCode,
      "problems": quizItems
          .map(
            (e) => {
              "title": e.title,
              "options": e.problems
                  ?.map((e2) => e2.textEditingController.text)
                  .toList(),
              "answerIndex": e.answer?.index,
              "answer": e.answer?.textEditingController.text
            },
          )
          .toList(),
    });

    await quizStateRef.child("${newQuizDetailRef.key}").set({
      "quizDetailRef": newQuizDetailRef.key,
      "user": [],
      "state": false,
      "score": [],
      "solve": [{}],
    });

    final newQuizRef = quizRef.push();
    await newQuizRef.set({
      "code": pinCode,
      "uid": uid,
      "generateTime": DateTime.now().toString(),
      "timestamp": DateTime.now().millisecondsSinceEpoch,
      "quizDetailRef": newQuizDetailRef.key,
    });
  }

  streamQuizzes() {
    database?.ref("quiz").onValue.listen((event) {
      final data = event.snapshot.children;
      quizList.clear();
      for (var element in data) {
        quizList.add(
          Quiz.fromJson(
            jsonDecode(
              jsonEncode(element.value),
            ),
          ),
        );
      }
      setState(() {});
    });
  }

  @override
  void initState() {
    super.initState();
    signInAnonymously();
    streamQuizzes();
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('퀴즈 출제하기(출제자용)'),
      ),
      body: DefaultTabController(
        length: 2,
        child: Column(
          children: [
            const TabBar(
              tabs: [
                Tab(text: '출제하기'),
                Tab(text: '퀴즈목록'),
              ],
            ),
            Expanded(
              child: TabBarView(
                children: [
                  Column(
                    children: [
                      Expanded(
                        child: ListView.builder(
                          itemCount: quizItems.length,
                          itemBuilder: (context, index) {
                            return ExpansionTile(
                              title:
                                  Text(quizItems[index].title ?? "문제 타이틀 없음"),
                              children: quizItems[index]
                                      .problems
                                      ?.map(
                                        (e) => ListTile(
                                          title: Text(
                                              e.textEditingController.text),
                                        ),
                                      )
                                      .toList() ??
                                  [],
                            );
                          },
                        ),
                      ),
                      MaterialButton(
                        height: 72,
                        color: Colors.indigo,
                        onPressed: () {
                          generateQuiz();
                        },
                        child: const Text(
                          '제출 및 핀코드 생성',
                          style: TextStyle(
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  ),
                  ListView.builder(
                      itemCount: quizList.length,
                      itemBuilder: (context, index) {
                        final item = quizList[index];
                        return ListTile(
                          title: Text("code: ${item.code}"),
                          subtitle: Text("${item.quizDetailRef}"),
                          onTap: () {
                            //
                          },
                        );
                      }),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () async {
          final quiz = await showModalBottomSheet(
            context: context,
            builder: (context) => const QuizBottomSheetWidget(),
          );

          setState(() {
            quizItems.add(quiz);
          });
        },
      ),
    );
  }
}
