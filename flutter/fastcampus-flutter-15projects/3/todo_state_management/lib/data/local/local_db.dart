import 'package:fast_app_base/data/local/collection/todo_db_model.dart';
import 'package:fast_app_base/data/todo_repository.dart';
import 'package:flutter/foundation.dart';
import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';

import '../../data/local/error/local_db_error.dart';
import '../memory/vo_todo.dart';
import '../simple_result.dart';

class LocalDB implements TodoRepository<LocalDBError> {
  static late final Isar _isar;

  LocalDB._();

  static LocalDB instance = LocalDB._();

  static Future<void> init() async {
    final dir = await getApplicationDocumentsDirectory();
    _isar = await Isar.open([TodoDbModelSchema], maxSizeMiB: 512, directory: dir.path);
  }

  @override
  Future<SimpleResult<List<Todo>, LocalDBError>> getTodoList() async {
    try {
      debugPrint('get response success');
      final documents = await _isar.todoDbModels.filter().idGreaterThan(0).findAll();
      return SimpleResult.success(documents.map((e) => e.createTodo()).toList());
    } catch (e) {
      debugPrint('get response fail');
      return SimpleResult.failure(
          LocalDBError(LocalDBErrorType.unknown, '에러가 발생했습니다. catch를 통해 세분화된 에러를 넘겨주세요.'));
    }
  }

  @override
  Future<SimpleResult<void, LocalDBError>> addTodo(Todo todo) async {
    await _isar.writeTxn(() async {
      await _isar.todoDbModels.put(todo.dbModel);
    });
    return SimpleResult.success();
  }

  @override
  Future<SimpleResult<void, LocalDBError>> updateTodo(Todo todo) async {
    await _isar.writeTxn(() async {
      await _isar.todoDbModels.put(todo.dbModel);
    });
    return SimpleResult.success();
  }

  @override
  Future<SimpleResult<void, LocalDBError>> removeTodo(Id id) async {
    await _isar.writeTxn(() async {
      await _isar.todoDbModels.delete(id);
    });
    return SimpleResult.success();
  }
}
