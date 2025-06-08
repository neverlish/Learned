import 'package:dio/dio.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/di/di.dart';
import 'package:fast_app_base/data/mapper.dart';
import 'package:fast_app_base/data/source/local/error/local_db_error.dart';
import 'package:fast_app_base/data/source/remote/result/api_error.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:injectable/injectable.dart';
import 'package:isar/isar.dart';

import '../../common/util/simple_result.dart';
import '../source/local/todo_db.dart';
import '../source/remote/todo_api.dart';

/// Remote
// @Singleton(as: TodoRepository)
class TodoRemoteRepository implements TodoRepository<ApiError> {
  final TodoApi _api;

  TodoRemoteRepository([TodoApi? api]) : _api = api ?? locator();

  @override
  Future<SimpleResult<List<Todo>, ApiError>> getTodoList() async {
    return tryRequest(() async {
      final todoList = await _api.getTodoList();
      return SimpleResult.success(todoList.map((e) => e.toModel()).toList());
    });
  }

  @override
  Future<SimpleResult<void, ApiError>> addTodo(Todo todo) async {
    return tryRequest(() async {
      await _api.addTodo(todo.toDTO());
      return SimpleResult.success();
    });
  }

  @override
  Future<SimpleResult<void, ApiError>> updateTodo(Todo todo) async {
    return tryRequest(() async {
      await _api.updateTodo(todo.toDTO());
      return SimpleResult.success();
    });
  }

  @override
  Future<SimpleResult<void, ApiError>> removeTodo(int id) async {
    return tryRequest(() async {
      await _api.removeTodo(id);
      return SimpleResult.success();
    });
  }

  Future<SimpleResult<T, ApiError>> tryRequest<T>(Future<SimpleResult<T, ApiError>> Function() apiLogic) async {
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

/// Local
@Singleton(as: TodoRepository<LocalDBError>)
class TodoLocalRepository implements TodoRepository<LocalDBError> {
  final TodoDB _db;

  TodoLocalRepository([TodoDB? db]) : _db = db ?? locator();

  @override
  Future<SimpleResult<List<Todo>, LocalDBError>> getTodoList() async {
    final result = await _db.getTodoList();
    if (result.isSuccess) {
      return SimpleResult.success(result.successData.map((e) => e.toModel()).toList());
    } else {
      return SimpleResult.failure(result.failureData);
    }
  }

  @override
  Future<SimpleResult<void, LocalDBError>> addTodo(Todo todo) => _db.addTodo(todo.toDbModel());
  @override
  Future<SimpleResult<void, LocalDBError>> updateTodo(Todo todo) => _db.updateTodo(todo.toDbModel());

  @override
  Future<SimpleResult<void, LocalDBError>> removeTodo(Id id) => _db.removeTodo(id);
}
