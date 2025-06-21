import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/di/di.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:fast_app_base/presentation/main/tab/controller/todo_controller.dart';
import 'package:fast_app_base/presentation/main/tab/todo/w_fire.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TodoStatusWidget extends GetView<TodoController> {
  final Todo todo;

  @override
  TodoController get controller => locator();

  const TodoStatusWidget(
    this.todo, {
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Tap(
        onTap: () {
          controller.changeTodoStatus(todo);
        },
        child: SizedBox(
          height: 50,
          width: 50,
          child: switch (todo.status) {
            TodoStatus.complete => Checkbox(
                value: true,
                onChanged: null,
                fillColor: MaterialStateProperty.all(context.appColors.checkBoxColor),
              ),
            TodoStatus.incomplete => const Checkbox(
                value: false,
                onChanged: null,
              ),
            TodoStatus.ongoing => const Fire(),
            TodoStatus.unknown => const Icon(
                Icons.question_mark,
                size: 25,
              ).centered(),
          },
        ));
  }
}
