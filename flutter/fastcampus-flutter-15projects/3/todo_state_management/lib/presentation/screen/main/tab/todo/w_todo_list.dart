import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/presentation/screen/main/tab/todo/w_todo_item.dart';
import 'package:flutter/material.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';

import '../../../../../data/memory/todo_data.dart';

class TodoList extends StatefulWidget {
  const TodoList({super.key});

  @override
  State<TodoList> createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> with TodoDataProvider {
  @override
  Widget build(BuildContext context) {
    return Obx(
      () => todoData.todoList.isEmpty
          ? '할일을 작성해보세요'.text.size(30).makeCentered()
          : SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: todoData.todoList
                    .map((e) => TodoItem(
                          todo: e,
                        ))
                    .toList(),
              ),
            ),
    );
  }
}
