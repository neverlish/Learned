import 'package:fastcampus_realtime_quiz_app/model/quiz.dart';
import 'package:flutter/material.dart';

class QuizManagerPage extends StatefulWidget {
  const QuizManagerPage({super.key});

  @override
  State<QuizManagerPage> createState() => _QuizManagerPageState();
}

class _QuizManagerPageState extends State<QuizManagerPage> {
  String? uid;
  List<QuizManager> quizItems = [];

  @override
  void initState() {
    super.initState();
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
                          //
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
                  Container(),
                ],
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () async {
          //
        },
      ),
    );
  }
}
