import 'package:equatable/equatable.dart';

import 'package:uuid/uuid.dart';

Uuid uuid = const Uuid();

class Todo extends Equatable {
  final String id;
  final String desc;
  final bool completed;

  Todo({
    String? id,
    required this.desc,
    this.completed = false,
  }) : id = id ?? uuid.v4();

  @override
  List<Object> get props => [id, desc, completed];

  @override
  bool get stringify => true;
}

enum Filter {
  all,
  active,
  completed,
}
