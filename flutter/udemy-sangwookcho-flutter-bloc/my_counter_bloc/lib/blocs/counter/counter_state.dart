part of 'counter_bloc.dart';

final class CounterState extends Equatable {
  final int counter;
  const CounterState({
    required this.counter,
  });

  factory CounterState.initial() {
    return const CounterState(counter: 0);
  }

  @override
  List<Object> get props => [counter];

  @override
  String toString() => 'CounterState(counter: $counter)';

  CounterState copyWith({
    int? counter,
  }) {
    return CounterState(
      counter: counter ?? this.counter,
    );
  }
}
