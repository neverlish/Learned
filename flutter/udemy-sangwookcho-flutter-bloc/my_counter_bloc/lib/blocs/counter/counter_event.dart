part of 'counter_bloc.dart';

sealed class CounterEvent extends Equatable {
  const CounterEvent();

  @override
  List<Object> get props => [];
}

final class IncrementCounterEvent extends CounterEvent {}

final class DecrementCounterEvent extends CounterEvent {}
