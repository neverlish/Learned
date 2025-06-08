import 'package:fast_app_base/data/data.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:fast_app_base/presentation/screen/main/tab/controller/todo_controller.dart';
import 'package:get/get.dart';

class TodoBindings implements Bindings {
  @override
  void dependencies() {
    // TODO: temp
    /// remote
    // Get.put<TodoApi>(TodoApi());
    // Get.put<TodoRepository>(TodoRemoteRepository());

    /// local
    Get.put<TodoDB>(TodoDB());
    Get.put<TodoRepository>(TodoLocalRepository());
    Get.put<TodoController>(TodoController());
  }
}
