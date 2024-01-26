import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_state_notifier/flutter_state_notifier.dart';
import 'package:state_notifier/state_notifier.dart';
import 'package:todo_provider/models/todo_model.dart';
import 'package:todo_provider/providers/todo_filter.dart';
import 'package:todo_provider/providers/todo_list.dart';
import 'package:todo_provider/providers/todo_search.dart';

class FilteredTodosState extends Equatable {
  final List<Todo> filteredTodos;

  const FilteredTodosState({
    required this.filteredTodos,
  });

  factory FilteredTodosState.initial() {
    return const FilteredTodosState(filteredTodos: []);
  }

  @override
  List<Object> get props => [filteredTodos];

  @override
  bool get stringify => true;

  FilteredTodosState copyWith({
    List<Todo>? filteredTodos,
  }) {
    return FilteredTodosState(
      filteredTodos: filteredTodos ?? this.filteredTodos,
    );
  }
}

class FilteredTodos extends StateNotifier<FilteredTodosState>
    with LocatorMixin {
  FilteredTodos() : super(FilteredTodosState.initial());

  @override
  void update(Locator watch) {
    super.update(watch);

    List<Todo> filteredTodos;

    final String todoSearch = watch<TodoSearchState>().searchTerm;
    final Filter todoFilter = watch<TodoFilterState>().filter;
    final List<Todo> todoList = watch<TodoListState>().todos;

    switch (todoFilter) {
      case Filter.active:
        filteredTodos = todoList.where((todo) => !todo.completed).toList();
        break;
      case Filter.completed:
        filteredTodos = todoList.where((todo) => todo.completed).toList();
        break;
      case Filter.all:
      default:
        filteredTodos = todoList;
        break;
    }

    if (todoSearch.isNotEmpty) {
      filteredTodos = filteredTodos
          .where((todo) => todo.desc.toLowerCase().contains(todoSearch))
          .toList();
    }

    state = state.copyWith(filteredTodos: filteredTodos);
    super.update(watch);
  }
}
