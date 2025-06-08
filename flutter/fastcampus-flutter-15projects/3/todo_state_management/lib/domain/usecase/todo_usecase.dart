import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/di/di.dart';
import 'package:fast_app_base/data/source/local/error/local_db_error.dart';
import 'package:fast_app_base/domain/usecase/base.dart';

import '../model/model.dart';
import '../repository/repository.dart';

/// 2) Use Case 하나만 만들고 메서드 구현
/// CRUD
class TodoUseCase {
  /// CRUD
}

/// 1) Use Case feature 단위 클래스
class AddTodoUseCase implements UseCase<void, Todo> {
  // final TodoRepository<LocalDBError> _repository = locator();
  final TodoRepository<LocalDBError> _repository;
  // final TodoLocalRepository
  AddTodoUseCase([TodoRepository<LocalDBError>? repository]) : _repository = repository ?? locator();

  @override
  Future<void> execute(Todo params) {
    return _repository.addTodo(params);
  }
}

class ReadTodosUseCase implements UseCase<List<Todo>, void> {
  final TodoRepository<LocalDBError> _repository;

  ReadTodosUseCase([TodoRepository<LocalDBError>? repository]) : _repository = repository ?? locator();

  @override
  Future<List<Todo>> execute([void params]) async {
    final result = await _repository.getTodoList();
    return result.successData;
  }
}

class UpdateTodoUseCase implements UseCase<void, Todo> {
  final TodoRepository<LocalDBError> _repository;

  UpdateTodoUseCase([TodoRepository<LocalDBError>? repository]) : _repository = repository ?? locator();

  @override
  Future<void> execute(Todo params) {
    return _repository.updateTodo(params);
  }
}

class RemoveTodoUseCase implements UseCase<void, int> {
  final TodoRepository<LocalDBError> _repository;

  RemoveTodoUseCase([TodoRepository<LocalDBError>? repository]) : _repository = repository ?? locator();

  @override
  Future<void> execute(int params) {
    return _repository.removeTodo(params);
  }
}
