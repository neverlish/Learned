import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:todo_riverpod_enum/models/todo_model.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_filter/todo_filter_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_list/todo_list_provider.dart';
import 'package:todo_riverpod_enum/pages/providers/todo_search/todo_search_provider.dart';

part 'filter_todos_provider.g.dart';

@riverpod
List<Todo> filteredTodos(FilteredTodosRef ref) {
  final todoListState = ref.watch(todoListProvider);
  final filter = ref.watch(todoFilterProvider);
  final search = ref.watch(todoSearchProvider);

  List<Todo> tempTodos;

  tempTodos = switch (filter) {
    Filter.active =>
      todoListState.todos.where((todo) => !todo.completed).toList(),
    Filter.completed =>
      todoListState.todos.where((todo) => todo.completed).toList(),
    Filter.all => todoListState.todos,
  };

  if (search.isNotEmpty) {
    tempTodos = tempTodos
        .where((todo) => todo.desc.toLowerCase().contains(search.toLowerCase()))
        .toList();
  }
  return tempTodos;
}
