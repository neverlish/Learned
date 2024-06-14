import 'package:uuid/uuid.dart';

Uuid uuid = const Uuid();

class Todo {
  String id;
  String desc;
  bool completed;

  Todo({
    required this.id,
    required this.desc,
    this.completed = false,
  });

  factory Todo.add({
    required String desc,
  }) {
    return Todo(
      id: uuid.v4(),
      desc: desc,
    );
  }

  @override
  String toString() => 'Todo(id: $id, desc: $desc, completed: $completed)';
}
