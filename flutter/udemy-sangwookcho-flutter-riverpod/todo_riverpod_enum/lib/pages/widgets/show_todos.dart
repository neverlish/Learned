import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_enum/pages/providers/filter_todos/filter_todos_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_item/todo_item_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_list/todo_list_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_list/todo_list_state.dart';
import 'package:todo_riverpod_enum/pages/widgets/todo_item.dart';

class ShowTodos extends ConsumerStatefulWidget {
  const ShowTodos({super.key});

  @override
  _ShowTodosState createState() => _ShowTodosState();
}

class _ShowTodosState extends ConsumerState<ShowTodos> {
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      ref.read(todoListProvider.notifier).getTodos();
    });
  }

  @override
  Widget build(BuildContext context) {
    ref.listen<TodoListState>(todoListProvider, (previous, next) {
      if (next.status == TodoListStatus.failure) {
        showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                title: const Text(
                  'Error',
                  textAlign: TextAlign.center,
                ),
                content: Text(
                  next.error,
                  textAlign: TextAlign.center,
                ),
              );
            });
      }
    });
    final todoListState = ref.watch(todoListProvider);

    switch (todoListState.status) {
      case TodoListStatus.initial:
        return const SizedBox.shrink();
      case TodoListStatus.loading:
        return const Center(
          child: CircularProgressIndicator(),
        );
      case TodoListStatus.failure:
      case TodoListStatus.success:
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
}
