import 'package:fast_app_base/domain/domain.dart' as domain;

import 'entity/entity.dart';

/// ENTITY -> MODEL
extension TodoStatusEx on TodoStatus {
  domain.TodoStatus toModel() {
    return domain.TodoStatus.values[index];
  }
}

extension TodoDbModelEx on TodoDbModel {
  domain.Todo toModel() {
    return domain.Todo(
      id: id,
      title: title,
      dueDate: dueDate,
      createdTime: createdTime,
      status: status.toModel(),
      modifyTime: modifyTime,
    );
  }
}

extension TodoDTOEx on TodoDTO {
  domain.Todo toModel() {
    return domain.Todo(
      id: id,
      title: title,
      dueDate: dueDate,
      createdTime: createdTime,
      status: status.toModel(),
      modifyTime: modifyTime,
    );
  }
}

/// MODEL -> ENTITY
extension DomainTodoStatusEx on domain.TodoStatus {
  TodoStatus toEntity() {
    return TodoStatus.values[index];
  }
}

extension TodoEx on domain.Todo {
  TodoDbModel toDbModel() {
    return TodoDbModel(
      id,
      createdTime,
      modifyTime,
      title,
      dueDate,
      status.toEntity(),
    );
  }

  TodoDTO toDTO() {
    return TodoDTO(
      id: id,
      createdTime: createdTime,
      modifyTime: modifyTime,
      title: title,
      dueDate: dueDate,
      status: status.toEntity(),
    );
  }
}
