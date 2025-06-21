import 'package:fast_app_base/common/util/simple_result.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:fast_app_base/presentation/dialog/d_confirm.dart';
import 'package:fast_app_base/presentation/main/write/d_write_todo.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:injectable/injectable.dart';

@singleton
class TodoController extends GetxController {
  final RxList<Todo> todoList = <Todo>[].obs;

  void refreshTodos() async {
    try {
      final remoteTodoList = await ReadTodosUseCase().execute();
      todoList.value = remoteTodoList;
      todoList.refresh();
    } catch (e) {
      debugPrint(e.toString());
    }
  }

  int get newId {
    return DateTime.now().millisecondsSinceEpoch;
  }

  void addTodo(SimpleResult<TodoWriteResult, void>? result) async {
    result?.runIfSuccess((data) {
      final newTodo = Todo(
        id: newId,
        title: data.title,
        dueDate: data.dueDate,
        createdTime: DateTime.now(),
        status: TodoStatus.incomplete,
      );
      todoList.add(newTodo);
      AddTodoUseCase().execute(newTodo);
    });
  }

  void changeTodoStatus(Todo todo) async {
    switch (todo.status) {
      case TodoStatus.complete:
        final result = await ConfirmDialog('다시 처음 상태로 변경하시겠어요?').show();
        result?.runIfSuccess((data) {
          todo.status = TodoStatus.incomplete;
        });
      case TodoStatus.incomplete:
        todo.status = TodoStatus.ongoing;
      case TodoStatus.ongoing:
        todo.status = TodoStatus.complete;
      case TodoStatus.unknown:
        return;
    }
    updateTodo(todo);
  }

  void editTodo(Todo todo) async {
    final result = await WriteTodoBottomSheet(todoForEdit: todo).show();
    result?.runIfSuccess((data) {
      todo.modifyTime = DateTime.now();
      todo.title = data.title;
      todo.dueDate = data.dueDate;
    });
    updateTodo(todo);
  }

  void updateTodo(Todo todo) {
    UpdateTodoUseCase().execute(todo);
    todoList.refresh();
  }

  void removeTodo(Todo todo) {
    todoList.remove(todo);
    RemoveTodoUseCase().execute(todo.id);
  }
}
