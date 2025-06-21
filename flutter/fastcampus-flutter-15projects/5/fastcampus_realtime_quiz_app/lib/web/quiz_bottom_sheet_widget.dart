import 'package:fastcampus_realtime_quiz_app/model/problem.dart';
import 'package:fastcampus_realtime_quiz_app/model/quiz.dart';
import 'package:flutter/material.dart';

class QuizBottomSheetWidget extends StatefulWidget {
  const QuizBottomSheetWidget({super.key});

  @override
  State<QuizBottomSheetWidget> createState() => _QuizBottomSheetWidgetState();
}

class _QuizBottomSheetWidgetState extends State<QuizBottomSheetWidget> {
  List<ProblemManager> problemItems = [];

  ProblemManager? selectedAnswer;

  TextEditingController titleTextEditingController = TextEditingController();

  addOption() {
    problemItems.add(
      ProblemManager(
        index: problemItems.length,
        textEditingController: TextEditingController(),
      ),
    );
    setState(() {});
  }

  removeOption(int index) {
    problemItems.removeAt(index);
    setState(() {});
  }

  @override
  void dispose() {
    titleTextEditingController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text("퀴즈 (문제) 출제하기"),
          TextField(
            decoration: const InputDecoration(
              hintText: "문제를 입력해주세요.",
            ),
            controller: titleTextEditingController,
          ),
          const Text("문제에 대한 선택지 출제"),
          Expanded(
            child: ListView.builder(
              itemCount: problemItems.length,
              itemBuilder: (context, index) {
                final item = problemItems[index];
                return Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: item.textEditingController,
                        decoration: const InputDecoration(
                          hintText: "선택지 입력",
                        ),
                        onSubmitted: (s) {
                          setState(() {});
                        },
                      ),
                    ),
                    IconButton(
                      onPressed: () => removeOption(index),
                      icon: const Icon(
                        Icons.clear,
                      ),
                    )
                  ],
                );
              },
            ),
          ),
          const Text("정답 선택"),
          DropdownButton<ProblemManager>(
            value: selectedAnswer,
            items: problemItems
                .map(
                  (e) => DropdownMenuItem<ProblemManager>(
                    value: e,
                    child: Text(e.textEditingController.text),
                  ),
                )
                .toList(),
            onChanged: (value) {
              setState(() {
                selectedAnswer = value;
              });
            },
          ),

          /// 2024-09-14 ButtonBar 에서 OverflowBar로 변경
          /// why: deprecated ButtonBar widget
          OverflowBar(
            children: [
              TextButton(
                onPressed: () => addOption(),
                child: const Text("선택지 추가"),
              ),
              TextButton(
                onPressed: () {
                  // 문제의 정답이 없는 경우
                  if (titleTextEditingController.text.isEmpty) {
                    return;
                  }
                  // 선택지가 없는 경우
                  if (problemItems.isEmpty) {
                    return;
                  }
                  // 정답지 없는 경우
                  if (selectedAnswer == null) {
                    return;
                  }

                  final quiz = QuizManager(
                    problems: [
                      ...problemItems,
                    ],
                    title: titleTextEditingController.text.trim(),
                    answer: selectedAnswer,
                  );

                  Navigator.of(context).pop<QuizManager>(quiz);
                },
                child: const Text("완료"),
              ),
            ],
          )
        ],
      ),
    );
  }
}
