import 'package:fast_app_base/class/object_oriented_programming/solid/1_srp/todo_note.dart';

abstract interface class CoreLocalRepositoryInterface {
  void save(TodoNote note);

  void modify(TodoNote note);
}

abstract interface class LocalRepositoryInterface
    extends CoreLocalRepositoryInterface {
  void sendLog(TodoNote note);

  void retrySave(TodoNote note);
}

class Repo1 implements LocalRepositoryInterface {
  @override
  void modify(TodoNote note) {}

  @override
  void retrySave(TodoNote note) {}

  @override
  void save(TodoNote note) {}

  @override
  void sendLog(TodoNote note) {}
}

class Repo2 implements CoreLocalRepositoryInterface {
  @override
  void modify(TodoNote note) {}

  @override
  void save(TodoNote note) {}
}

main() {
  final todo = TodoNote();
  todo.setContent('수학 과제', "p20 ~ p40를 공책에 작성");

  final repo = Repo1();
  repo.save(todo);
  repo.modify(todo);
}
