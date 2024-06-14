import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_hive/models/todo_model.dart';
import 'package:todo_riverpod_hive/pages/providers/todo_item/todo_item_provider.dart';
import 'package:todo_riverpod_hive/pages/providers/todo_list/todo_list_provider.dart';

class TodoItem extends ConsumerWidget {
  const TodoItem({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todo = ref.watch(todoItemProvider);

    return ListTile(
      onTap: () {
        showDialog(
          context: context,
          builder: (context) {
            return ConfirmEditDialog(todo: todo);
          },
        );
      },
      leading: Checkbox(
        value: todo.completed,
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

class ConfirmEditDialog extends ConsumerStatefulWidget {
  final Todo todo;
  const ConfirmEditDialog({super.key, required this.todo});

  @override
  _ConfirmEditDialogState createState() => _ConfirmEditDialogState();
}

class _ConfirmEditDialogState extends ConsumerState<ConfirmEditDialog> {
  late final TextEditingController textController;
  bool error = false;

  @override
  void initState() {
    super.initState();
    textController = TextEditingController(text: widget.todo.desc);
  }

  @override
  void dispose() {
    textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Edit Todo'),
      content: TextField(
        controller: textController,
        autofocus: true,
        decoration: InputDecoration(
          errorText: error ? 'Value cannot be empty' : null,
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('CANCEL'),
        ),
        TextButton(
          onPressed: () {
            error = textController.text.isEmpty ? true : false;
            if (error) {
              setState(() {});
            } else {
              ref.read(todoListProvider.notifier).editTodo(
                    widget.todo.id,
                    textController.text,
                  );
              Navigator.of(context).pop();
            }
          },
          child: const Text('EDIT'),
        ),
      ],
    );
  }
}
