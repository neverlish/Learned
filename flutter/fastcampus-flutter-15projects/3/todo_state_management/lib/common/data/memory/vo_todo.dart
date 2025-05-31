import 'package:fast_app_base/common/data/memory/todo_status.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'vo_todo.freezed.dart';

@freezed
class Todo with _$Todo {
  const factory Todo({
    required int id,
    required String title,
    required DateTime dueDate,
    DateTime? modifyTime,
    required DateTime createdTime,
    required TodoStatus status,
  }) = _Todo;
}
