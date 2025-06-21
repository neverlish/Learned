import 'package:flutter/cupertino.dart';

class ProblemManager {
  int? index;
  TextEditingController textEditingController;

  ProblemManager({
    required this.index,
    required this.textEditingController,
  });
}

class Problems {
  int? answerIndex;
  String? answer;
  List<String>? options;
  String? title;

  Problems({this.answerIndex, this.answer, this.options, this.title});

  Problems.fromJson(Map<String, dynamic> json) {
    answerIndex = json["answerIndex"];
    answer = json["answer"];
    options = json["options"].cast<String>();
    title = json["title"];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data["title"] = title;
    data["answerIndex"] = answerIndex;
    data["answer"] = answer;
    data["options"] = options;

    return data;
  }
}
