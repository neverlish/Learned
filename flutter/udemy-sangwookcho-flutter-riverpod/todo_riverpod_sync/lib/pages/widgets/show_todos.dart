import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_sync/pages/providers/filter_todos/filter_todos_provider.dart';
import 'package:todo_riverpod_sync/pages/widgets/todo_item.dart';

class ShowTodos extends ConsumerWidget {
  const ShowTodos({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final filteredTodos = ref.watch(filteredTodosProvider);

    return ListView.separated(
      itemCount: filteredTodos.length,
      separatorBuilder: (BuildContext context, int index) {
        return const Divider(color: Colors.grey);
      },
      itemBuilder: (BuildContext context, int index) {
        final todo = filteredTodos[index];
        return TodoItem(todo: todo);
      },
    );
  }
}
