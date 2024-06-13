import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_enum/pages/providers/filter_todos/filter_todos_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_item/todo_item_provider.dart';
import 'package:todo_riverpod_enum/pages/widgets/todo_item.dart';

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
        return ProviderScope(
          overrides: [
            todoItemProvider.overrideWithValue(todo),
          ],
          child: const TodoItem(),
        );
      },
    );
  }
}
