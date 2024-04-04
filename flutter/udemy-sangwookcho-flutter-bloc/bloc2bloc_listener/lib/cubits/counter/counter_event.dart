part of 'counter_bloc.dart';

class CounterEvent extends Equatable {
  const CounterEvent();

  @override
  List<Object> get props => [];
}

class ChangeCounterEvent extends CounterEvent {
  final int incrementSize;

  const ChangeCounterEvent({
    required this.incrementSize,
  });

  @override
  List<Object> get props => [incrementSize];
}
