import 'package:dio/dio.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/data/remote/result/api_error.dart';
import 'package:fast_app_base/data/remote/todo_client.dart';

import '../memory/vo_todo.dart';
import '../simple_result.dart';
import '../todo_repository.dart';

///Remote DB
class TodoApi implements TodoRepository<ApiError> {
  final client = TodoClient(Dio());

  TodoApi._();

  static TodoApi instance = TodoApi._();

  @override
  Future<SimpleResult<List<Todo>, ApiError>> getTodoList() async {
    return tryRequest(() async {
      final todoList = await client.getTodoList();
      return SimpleResult.success(todoList);
    });
  }

  @override
  Future<SimpleResult<void, ApiError>> addTodo(Todo todo) async {
    return tryRequest(() async {
      await client.addTodo(todo);
      return SimpleResult.success();
    });
  }

  @override
  Future<SimpleResult<void, ApiError>> updateTodo(Todo todo) async {
    return tryRequest(() async {
      await client.updateTodo(todo);
      return SimpleResult.success();
    });
  }

  @override
  Future<SimpleResult<void, ApiError>> removeTodo(int id) async {
    return tryRequest(() async {
      await client.removeTodo(id);
      return SimpleResult.success();
    });
  }

  Future<SimpleResult<T, ApiError>> tryRequest<T>(
      Future<SimpleResult<T, ApiError>> Function() apiLogic) async {
    try {
      return await apiLogic();
    } on DioException catch (e) {
      return SimpleResult.failure(ApiError(
          message: e.message ?? e.error?.toString() ?? 'error message is not exist',
          statusCode: e.response?.statusCode ?? 0));
    } catch (e) {
      return SimpleResult.failure(ApiError(message: 'unknown error ${e.toString()}'));
    }
  }
}
