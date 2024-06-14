import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';
import 'package:uuid/uuid.dart';

part 'todo_model.freezed.dart';

Uuid uuid = const Uuid();

@freezed
class Todo with _$Todo {
  const factory Todo({
    required String id,
    required String desc,
    @Default(false) bool completed,
  }) = _Todo;

  factory Todo.add({required String desc}) {
    return Todo(
      id: uuid.v4(),
      desc: desc,
    );
  }
}
