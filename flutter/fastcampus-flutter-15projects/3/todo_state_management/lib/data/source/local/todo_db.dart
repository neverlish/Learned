import 'package:fast_app_base/data/entity/todo_db_model.dart';
import 'package:isar/isar.dart';
import 'package:path_provider/path_provider.dart';

import '../../entity/entity.dart';
import '../../../common/util/simple_result.dart';
import 'error/local_db_error.dart';

/// TodoDAO
class TodoDB {
  static late final Isar _isar;

  static Future<void> init() async {
    final dir = await getApplicationDocumentsDirectory();
    _isar = await Isar.open([TodoDbModelSchema], maxSizeMiB: 512, directory: dir.path);
  }

  Future<SimpleResult<List<TodoDbModel>, LocalDBError>> getTodoList() async {
    try {
      final documents = await _isar.todoDbModels.filter().idGreaterThan(0).findAll();
      return SimpleResult.success(documents);
    } catch (e) {
      return SimpleResult.failure(LocalDBError(LocalDBErrorType.unknown, '에러가 발생했습니다. catch를 통해 세분화된 에러를 넘겨주세요.'));
    }
  }

  Future<SimpleResult<void, LocalDBError>> addTodo(TodoDbModel todo) async {
    await _isar.writeTxn(() async {
      await _isar.todoDbModels.put(todo);
    });
    return SimpleResult.success();
  }

  Future<SimpleResult<void, LocalDBError>> updateTodo(TodoDbModel todo) async {
    await _isar.writeTxn(() async {
      await _isar.todoDbModels.put(todo);
    });
    return SimpleResult.success();
  }

  Future<SimpleResult<void, LocalDBError>> removeTodo(Id id) async {
    await _isar.writeTxn(() async {
      await _isar.todoDbModels.delete(id);
    });
    return SimpleResult.success();
  }
}
