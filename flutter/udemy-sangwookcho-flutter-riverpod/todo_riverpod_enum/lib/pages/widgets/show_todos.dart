import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_enum/models/todo_model.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_filter/todo_filter_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_item/todo_item_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_list/todo_list_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_list/todo_list_state.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_search/todo_search_provider.dart';
import 'package:todo_riverpod_enum/pages/widgets/todo_item.dart';

class ShowTodos extends ConsumerStatefulWidget {
  const ShowTodos({super.key});

  @override
  _ShowTodosState createState() => _ShowTodosState();
}

class _ShowTodosState extends ConsumerState<ShowTodos> {
  Widget prevTodosWidget = const SizedBox.shrink();

  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      ref.read(todoListProvider.notifier).getTodos();
    });
  }

  List<Todo> filterTodos(List<Todo> allTodos) {
    final filter = ref.watch(todoFilterProvider);
    final search = ref.watch(todoSearchProvider);

    List<Todo> tempTodos;

    tempTodos = switch (filter) {
      Filter.active => allTodos.where((todo) => !todo.completed).toList(),
      Filter.completed => allTodos.where((todo) => todo.completed).toList(),
      Filter.all => allTodos,
    };

    if (search.isNotEmpty) {
      tempTodos = tempTodos
          .where(
              (todo) => todo.desc.toLowerCase().contains(search.toLowerCase()))
          .toList();
    }
    return tempTodos;
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
        return prevTodosWidget;
      case TodoListStatus.failure when prevTodosWidget is SizedBox:
        return Center(
          child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
            Text(
              todoListState.error,
              style: const TextStyle(fontSize: 20),
            ),
            const SizedBox(height: 20),
            OutlinedButton(
              onPressed: () {
                ref.read(todoListProvider.notifier).getTodos();
              },
              child: const Text(
                'Please Retry!',
                style: TextStyle(fontSize: 20),
              ),
            ),
          ]),
        );
      case TodoListStatus.failure:
        return prevTodosWidget;
      case TodoListStatus.success:
        final filteredTodos = filterTodos(todoListState.todos);

        prevTodosWidget = ListView.separated(
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
        return prevTodosWidget;
    }
  }
}
