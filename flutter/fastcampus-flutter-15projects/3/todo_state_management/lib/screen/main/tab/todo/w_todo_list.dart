import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/screen/main/tab/todo/w_todo_item.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TodoList extends ConsumerWidget {
  const TodoList({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todoList = ref.watch(todoDataProvider);
    return todoList.isEmpty
            ? '할일을 작성해보세요'.text.size(30).makeCentered()
            : Column(
            children: todoList.map((e) => TodoItem(e)).toList(),
          );
  }
}


// class TodoList extends StatelessWidget {
//   const TodoList({super.key});

//   @override
//   Widget build(BuildContext context) {
//     return GetBuilder<TodoDataHolder>(
//       builder: (todoData) => todoData.todoList.isEmpty
//             ? '할일을 작성해보세요'.text.size(30).makeCentered()
//             : Column(
//               children: todoData.todoList.map((e) => TodoItem(e)).toList(),
//             ),
//     );
//   }
// }
