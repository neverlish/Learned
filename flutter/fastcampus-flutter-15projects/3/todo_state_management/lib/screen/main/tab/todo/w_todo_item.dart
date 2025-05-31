import 'package:eva_icons_flutter/eva_icons_flutter.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/dart/extension/datetime_extension.dart';
import 'package:fast_app_base/common/data/memory/vo_todo.dart';
import 'package:fast_app_base/common/widget/w_rounded_container.dart';
import 'package:fast_app_base/screen/main/tab/todo/w_todo_status.dart';
import 'package:flutter/material.dart';

class TodoItem extends StatelessWidget with TodoDataProvider {
  final Todo todo;
  TodoItem(this.todo, {super.key});

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      onDismissed: (direction) {
        todoData.removeTodo(todo);
      },
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
      key: ValueKey(todo.id.toString()),
      child: RoundedContainer(
        margin: const EdgeInsets.only(bottom: 6),
        color: context.appColors.itemBackground,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            todo.dueDate.formattedDate.text.make(),
            Row(
              children: [
                TodoStatusWidget(todo),
                Expanded(child: todo.title.text.size(20).medium.make()),
                IconButton(
                    onPressed: () {
                      todoData.editTodo(todo);
                    },
                    icon: const Icon(EvaIcons.editOutline)),
              ],
            )
          ],
        ).pOnly(top: 15, right: 15, left: 5, bottom: 10),
      ),
    );
  }
}
