import 'package:fast_app_base/data/local/collection/todo_db_model.dart';
import 'package:fast_app_base/data/memory/todo_status.dart';

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

  int id;
  String title;
  final DateTime createdTime;
  DateTime? modifyTime;
  DateTime dueDate;
  TodoStatus status;

  factory Todo.fromDB(TodoDbModel e) {
    return Todo(
        id: e.id,
        title: e.title,
        dueDate: e.dueDate,
        createdTime: e.createdTime,
        status: e.status,
        modifyTime: e.modifyTime);
  }

  TodoDbModel toDbModel() =>
      TodoDbModel(id, createdTime, modifyTime, title, dueDate, status);
}
