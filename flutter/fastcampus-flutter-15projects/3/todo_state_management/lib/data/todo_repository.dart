import 'package:fast_app_base/data/simple_result.dart';

import 'memory/vo_todo.dart';

abstract interface class TodoRepository<Error> {
  Future<SimpleResult<List<Todo>, Error>> getTodoList();
  Future<SimpleResult<void, Error>> addTodo(Todo todo);
  Future<SimpleResult<void, Error>> updateTodo(Todo todo);
  Future<SimpleResult<void, Error>> removeTodo(int id);
}
