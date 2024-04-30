part of 'active_todo_count_cubit.dart';

class ActiveTodoCountState extends Equatable {
  final int activeTodoCount;

  const ActiveTodoCountState({
    required this.activeTodoCount,
  });

  factory ActiveTodoCountState.initial() {
    return const ActiveTodoCountState(activeTodoCount: 0);
  }

  @override
  List<Object> get props => [activeTodoCount];

  @override
  String toString() => 'ActiveTodoCountState(count: $activeTodoCount)';

  ActiveTodoCountState copyWith({
    int? count,
  }) {
    return ActiveTodoCountState(
      activeTodoCount: count ?? activeTodoCount,
    );
  }
}
