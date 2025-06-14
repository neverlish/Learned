import 'package:fastcampus_realtime_quiz_app/model/problem.dart';

class QuizManager {
  List<ProblemManager>? problems;
  String? title;
  ProblemManager? answer;

  QuizManager({
    this.problems,
    this.title,
    this.answer,
  });
}

class QuizDetail {
  String? code;
  List<Problems>? problems;

  QuizDetail({this.code, this.problems});

  QuizDetail.fromJson(Map<String, dynamic> json) {
    code = json["code"];
    if (json["problems"] != null) {
      problems = [];
      json["problems"].forEach((v) {
        problems!.add(Problems.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = {};
    data["code"] = code;
    if (problems != null) {
      data["problems"] = problems!.map((e) => e.toJson()).toList();
    }
    return data;
  }
}

class Quiz {
  String? code;
  String? generateTime;
  String? quizDetailRef;
  int? timestamp;
  String? uid;

  Quiz({
    this.code,
    this.generateTime,
    this.quizDetailRef,
    this.timestamp,
    this.uid,
  });

  Quiz.fromJson(Map<String, dynamic> json) {
    code = json["code"];
    generateTime = json["generateTime"];
    quizDetailRef = json["quizDetailRef"];
    timestamp = json["timestamp"];
    uid = json["uid"];
  }
}
