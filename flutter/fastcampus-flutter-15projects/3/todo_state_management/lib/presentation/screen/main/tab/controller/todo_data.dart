import 'package:fast_app_base/common/cli_common.dart';
import 'package:fast_app_base/common/util/async/flutter_async.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:fast_app_base/presentation/screen/dialog/d_confirm.dart';
import 'package:fast_app_base/presentation/screen/dialog/d_message.dart';
import 'package:fast_app_base/presentation/screen/main/write/d_write_todo.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TodoData extends GetxController {
  final RxList<Todo> todoList = <Todo>[].obs;

  TodoData([TodoRepository? todoRepository]) : _repository = todoRepository ?? Get.find();

  final TodoRepository _repository;

  @override
  void onInit() async {
    final remoteTodoList = await _repository.getTodoList();
    remoteTodoList.runIfSuccess((data) {
      todoList.addAll(data);
    });
    remoteTodoList.runIfFailure((error) {
      delay(() {
        MessageDialog(error.message).show();
      }, 100.ms);
    });
    super.onInit();
  }

  int get newId {
    return DateTime.now().millisecondsSinceEpoch;
  }

  void addTodo(BuildContext context) async {
    final result = await WriteTodoBottomSheet().show();
    result?.runIfSuccess((data) {
      final newTodo = Todo(
        id: newId,
        title: data.title,
        dueDate: data.dueDate,
        createdTime: DateTime.now(),
        status: TodoStatus.incomplete,
      );
      todoList.add(newTodo);
      _repository.addTodo(newTodo);
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

  editTodo(Todo todo) async {
    final result = await WriteTodoBottomSheet(todoForEdit: todo).show();
    result?.runIfSuccess((data) {
      todo.modifyTime = DateTime.now();
      todo.title = data.title;
      todo.dueDate = data.dueDate;
    });
    updateTodo(todo);
  }

  void updateTodo(Todo todo) {
    _repository.updateTodo(todo);
    todoList.refresh();
  }

  void removeTodo(Todo todo) {
    todoList.remove(todo);
    _repository.removeTodo(todo.id);
    //LocalDB.removeTodo(todo.id);
  }
}

mixin class TodoDataProvider {
  late final TodoData todoData = Get.find();
}
