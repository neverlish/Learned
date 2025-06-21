import 'package:fast_app_base/data/data.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:fast_app_base/presentation/main/tab/controller/todo_controller.dart';
import 'package:get/get.dart';

/// get_it
/// GetX
class TodoBindings implements Bindings {
  @override
  void dependencies() {
    // TODO: temp
    /// remote
    // Get.put<TodoApi>(TodoApi());
    // Get.put<TodoRepository>(TodoRemoteRepository());

    /// local
    Get.put<TodoDB>(TodoDB());


    ///
    Get.put<TodoRepository>(TodoLocalRepository());


    /// 
    Get.put<TodoController>(TodoController());
  }
}
