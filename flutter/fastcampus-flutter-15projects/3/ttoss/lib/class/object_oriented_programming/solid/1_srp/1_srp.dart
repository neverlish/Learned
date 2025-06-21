import 'package:fast_app_base/class/object_oriented_programming/solid/1_srp/local_repository.dart';
import 'package:fast_app_base/class/object_oriented_programming/solid/1_srp/todo_note.dart';

main() {
  final todo = TodoNote();
  final repository = LocalRepository();
  todo.setContent('수학 과제', "p20 ~ p40를 공책에 작성");

  repository.save(todo);
  repository.modify(todo);
  repository.remove(todo);
}
