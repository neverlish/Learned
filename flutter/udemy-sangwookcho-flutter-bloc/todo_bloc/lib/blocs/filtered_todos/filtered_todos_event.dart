part of 'filtered_todos_bloc.dart';

abstract class FilteredTodosEvent extends Equatable {
  const FilteredTodosEvent();

  @override
  List<Object> get props => [];
}

class CalculateFilteredTodosEvent extends FilteredTodosEvent {
  final List<Todo> filteredTodos;

  const CalculateFilteredTodosEvent({
    required this.filteredTodos,
  });

  @override
  String toString() => 'CalculateFilteredTodosEvent(count: $filteredTodos)';

  @override
  List<Object> get props => [filteredTodos];
}
