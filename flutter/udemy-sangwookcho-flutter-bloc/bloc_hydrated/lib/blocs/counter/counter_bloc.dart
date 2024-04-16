import 'package:equatable/equatable.dart';
import 'package:hydrated_bloc/hydrated_bloc.dart';

part 'counter_event.dart';
part 'counter_state.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> with HydratedMixin {
  CounterBloc() : super(CounterState.initial()) {
    hydrate();

    on<IncrementCounterEvent>((event, emit) {
      emit(state.copyWith(counter: state.counter + 1));
    });

    on<DecrementCounterEvent>((event, emit) {
      emit(state.copyWith(counter: state.counter - 1));
    });
  }

  @override
  CounterState? fromJson(Map<String, dynamic> json) {
    print('Counter from storage: $json');
    final counterState = CounterState.fromJson(json);
    print('CounterState: $counterState');
    return counterState;
  }

  @override
  Map<String, dynamic>? toJson(CounterState state) {
    print('CounterState to storage: $state');
    final counterJson = state.toJson();
    print('CounterJson: $counterJson');
    return counterJson;
  }
}
