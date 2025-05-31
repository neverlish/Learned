import 'package:fast_app_base/data/local/collection/todo_db_model.dart';
import 'package:fast_app_base/data/memory/todo_status.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'vo_todo.freezed.dart';
part 'vo_todo.g.dart';

@unfreezed
class Todo with _$Todo {

  Todo._();

  factory Todo({
    required final int id,
    @JsonKey(name: 'created_time') required final DateTime createdTime,
    DateTime? modifyTime,
    required String title,
    required DateTime dueDate,
    @Default(TodoStatus.unknown) TodoStatus status,
  }) = _Todo;

  factory Todo.fromJson(Map<String, Object?> json) => _$TodoFromJson(json);

  TodoDbModel get dbModel =>
      TodoDbModel(id, createdTime, modifyTime, title, dueDate, status);
}
