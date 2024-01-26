import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:flutter_state_notifier/flutter_state_notifier.dart';
import 'package:todo_provider/models/todo_model.dart';

class TodoListState extends Equatable {
  final List<Todo> todos;

  const TodoListState({
    required this.todos,
  });

  factory TodoListState.initial() {
    return TodoListState(todos: [
      Todo(id: '1', desc: 'Clean the room'),
      Todo(id: '2', desc: 'Wash the dish'),
      Todo(id: '3', desc: 'Do homework'),
    ]);
  }

  @override
  List<Object> get props => [todos];

  @override
  bool get stringify => true;

  TodoListState copyWith({
    List<Todo>? todos,
  }) {
    return TodoListState(
      todos: todos ?? this.todos,
    );
  }
}

class TodoList extends StateNotifier<TodoListState> {
  TodoList() : super(TodoListState.initial());

  void addTodo(String todoDesc) {
    final newTodo = Todo(desc: todoDesc);
    final newTodos = [...state.todos, newTodo];

    state = state.copyWith(todos: newTodos);
  }

  void editTodo(String id, String todoDesc) {
    final newTodos = state.todos.map((todo) {
      if (todo.id == id) {
        return Todo(id: id, desc: todoDesc, completed: todo.completed);
      }
      return todo;
    }).toList();

    state = state.copyWith(todos: newTodos);
  }

  void toggleTodo(String id) {
    final newTodos = state.todos.map((todo) {
      if (todo.id == id) {
        return Todo(id: id, desc: todo.desc, completed: !todo.completed);
      }
      return todo;
    }).toList();

    state = state.copyWith(todos: newTodos);
  }

  void removeTodo(Todo todo) {
    final newTodos = state.todos.where((t) => t.id != todo.id).toList();

    state = state.copyWith(todos: newTodos);
  }
}
