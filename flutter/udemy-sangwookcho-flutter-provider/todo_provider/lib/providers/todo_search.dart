import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';

class TodoSearchState extends Equatable {
  final String searchTerm;

  const TodoSearchState({
    required this.searchTerm,
  });

  factory TodoSearchState.initial() {
    return const TodoSearchState(searchTerm: '');
  }

  @override
  List<Object> get props => [searchTerm];

  @override
  bool get stringify => true;

  TodoSearchState copyWith({
    String? searchTerm,
  }) {
    return TodoSearchState(
      searchTerm: searchTerm ?? this.searchTerm,
    );
  }
}

class TodoSearch with ChangeNotifier {
  TodoSearchState _state = TodoSearchState.initial();

  TodoSearchState get state => _state;

  void setSearchTerm(String searchTerm) {
    _state = _state.copyWith(searchTerm: searchTerm);
    notifyListeners();
  }
}
