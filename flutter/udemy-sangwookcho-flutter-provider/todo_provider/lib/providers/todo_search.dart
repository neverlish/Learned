import 'package:equatable/equatable.dart';
import 'package:flutter_state_notifier/flutter_state_notifier.dart';

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

class TodoSearch extends StateNotifier<TodoSearchState> {
  TodoSearch() : super(TodoSearchState.initial());

  void setSearchTerm(String searchTerm) {
    state = state.copyWith(searchTerm: searchTerm);
  }
}
