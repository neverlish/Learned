import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_sync/models/todo_model.dart';
import 'package:todo_riverpod_sync/pages/providers/todo_list/todo_list_provider.dart';

class TodoItem extends ConsumerWidget {
  const TodoItem({super.key, required this.todo});
  final Todo todo;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return ListTile(
      leading: Checkbox(
        value: todo.complete,
        onChanged: (value) {
          ref.read(todoListProvider.notifier).toggleTodo(todo.id);
        },
      ),
      title: Text(todo.desc),
      trailing: IconButton(
        onPressed: () async {
          final removeOrNot = await showDialog(
            context: context,
            barrierDismissible: false,
            builder: (context) {
              return AlertDialog(
                title: const Text('Are you sure?'),
                content: const Text('Do you want to delete?'),
                actions: [
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(false),
                    child: const Text('No'),
                  ),
                  TextButton(
                    onPressed: () => Navigator.of(context).pop(true),
                    child: const Text('Yes'),
                  ),
                ],
              );
            },
          );
          if (removeOrNot) {
            ref.read(todoListProvider.notifier).removeTodo(todo.id);
          }
        },
        icon: const Icon(Icons.delete),
      ),
    );
  }
}
