import 'package:isar/isar.dart';

import '../../memory/todo_status.dart';

part 'todo_db_model.g.dart';

@collection
class TodoDbModel {
  Id id;

  @Index(type: IndexType.value)
  final DateTime? createdTime;

  @Index(type: IndexType.value)
  DateTime? modifyTime;

  @Index(type: IndexType.value)
  String title;

  DateTime dueDate;

  @enumerated
  TodoStatus status;

  TodoDbModel(
    this.id,
    this.createdTime,
    this.modifyTime,
    this.title,
    this.dueDate,
    this.status,
  );
}
