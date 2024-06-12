import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/foundation.dart';

import '../models/todo_model.dart';

class TodosNotifier extends ChangeNotifier {
  List<Todo> todos = [];

  void addTodo(String desc) {
    todos.add(Todo.add(desc: desc));
    notifyListeners();
  }

  void toggleTodo(String id) {
    final todo = todos.firstWhere((todo) => todo.id == id);
    todo.completed = !todo.completed;
    notifyListeners();
  }

  void removeTodo(String id) {
    todos.removeWhere((todo) => todo.id == id);
    notifyListeners();
  }
}

final todosProvider = ChangeNotifierProvider((ref) {
  return TodosNotifier();
});
