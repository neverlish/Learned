import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/di/di.dart';
import 'package:fast_app_base/presentation/main/tab/controller/todo_controller.dart';
import 'package:fast_app_base/presentation/main/tab/todo/w_todo_item.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TodoList extends GetView<TodoController> {
  const TodoList({super.key});

  @override
  TodoController get controller => locator();

  @override
  Widget build(BuildContext context) {
    return Obx(
      () => controller.todoList.isEmpty
          ? '할일을 작성해보세요'.text.size(30).makeCentered()
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: controller.todoList
                    .map((e) => TodoItem(
                          todo: e,
                        ))
                    .toList(),
              ),
            ),
    );
  }
}
