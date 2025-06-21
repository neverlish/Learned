import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/dart/extension/datetime_extension.dart';
import 'package:fast_app_base/common/di/di.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:fast_app_base/presentation/main/tab/controller/todo_controller.dart';
import 'package:fast_app_base/presentation/main/tab/todo/w_todo_status.dart';
import 'package:fast_app_base/presentation/widget/w_rounded_container.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TodoItem extends GetView<TodoController> {
  final Todo todo;

  @override
  TodoController get controller => locator();

  const TodoItem({super.key, required this.todo});

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: ValueKey(todo.id),
      background: RoundedContainer(
        color: context.appColors.removeTodoBg,
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Width(20),
            Icon(
              EvaIcons.trash2Outline,
              color: Colors.white,
            ),
          ],
        ),
      ),
      secondaryBackground: RoundedContainer(
        color: context.appColors.removeTodoBg,
        child: const Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            Icon(
              EvaIcons.trash2Outline,
              color: Colors.white,
            ),
            Width(20),
          ],
        ),
      ),
      onDismissed: (direction) {
        controller.removeTodo(todo);
      },
      child: RoundedContainer(
        margin: const EdgeInsets.symmetric(vertical: 3),
        color: context.appColors.itemBackground,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            todo.dueDate.relativeDays.text.size(10).medium.make(),
            Row(
              children: [
                TodoStatusWidget(todo),
                Expanded(child: todo.title.text.size(20).medium.make()),
                IconButton(onPressed: () => controller.editTodo(todo), icon: const Icon(EvaIcons.editOutline)),
              ],
            ),
          ],
        ).pOnly(top: 15, right: 15, bottom: 10, left: 5),
      ),
    );
  }
}
