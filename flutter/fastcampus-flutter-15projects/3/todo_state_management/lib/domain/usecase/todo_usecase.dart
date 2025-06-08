import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/domain/usecase/base.dart';
import 'package:get/get.dart';

import '../model/model.dart';
import '../repository/repository.dart';

class AddTodoUseCase implements UseCase<void, Todo> {
  final TodoRepository _repository;

  AddTodoUseCase([TodoRepository? repository]) : _repository = repository ?? Get.find();

  @override
  Future<void> execute(Todo params) {
    return _repository.addTodo(params);
  }
}

class ReadTodosUseCase implements UseCase<List<Todo>, void> {
  final TodoRepository _repository;

  ReadTodosUseCase([TodoRepository? repository]) : _repository = repository ?? Get.find();

  @override
  Future<List<Todo>> execute([void params]) async {
    final result = await _repository.getTodoList();
    return result.successData;
  }
}

class UpdateTodoUseCase implements UseCase<void, Todo> {
  final TodoRepository _repository;

  UpdateTodoUseCase([TodoRepository? repository]) : _repository = repository ?? Get.find();

  @override
  Future<void> execute(Todo params) {
    return _repository.updateTodo(params);
  }
}

class RemoveTodoUseCase implements UseCase<void, int> {
  final TodoRepository _repository;

  RemoveTodoUseCase([TodoRepository? repository]) : _repository = repository ?? Get.find();

  @override
  Future<void> execute(int params) {
    return _repository.removeTodo(params);
  }
}
