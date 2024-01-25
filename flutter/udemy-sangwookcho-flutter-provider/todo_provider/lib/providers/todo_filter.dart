import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:todo_provider/models/todo_model.dart';

class TodoFilterState extends Equatable {
  final Filter filter;

  const TodoFilterState({
    required this.filter,
  });

  factory TodoFilterState.initial() {
    return const TodoFilterState(filter: Filter.all);
  }

  @override
  List<Object> get props => [filter];

  @override
  bool get stringify => true;

  TodoFilterState copyWith({
    Filter? filter,
  }) {
    return TodoFilterState(
      filter: filter ?? this.filter,
    );
  }
}

class TodoFilter with ChangeNotifier {
  TodoFilterState _state = TodoFilterState.initial();

  TodoFilterState get state => _state;

  void updateFilter(Filter filter) {
    _state = _state.copyWith(filter: filter);
    notifyListeners();
  }
}
