import 'package:freezed_annotation/freezed_annotation.dart';

import 'todo_status.dart';

part 'vo_todo.g.dart';

@JsonSerializable()
class Todo {
  Todo({
    required this.id,
    required this.title,
    required this.dueDate,
    this.modifyTime,
    TodoStatus? status,
    DateTime? createdTime,
  })  : createdTime = createdTime ?? DateTime.now(),
        status = status ?? TodoStatus.incomplete;

  factory Todo.fromJson(Map<String, Object?> json) => _$TodoFromJson(json);

  int id;
  String title;
  final DateTime createdTime;
  DateTime? modifyTime;
  DateTime dueDate;
  TodoStatus status;

  Map<String, dynamic> toJson() => _$TodoToJson(this);

  void update(Todo todo) {
    title = todo.title;
    modifyTime = todo.modifyTime;
    dueDate = todo.dueDate;
    status = todo.status;
  }
}
