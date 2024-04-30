import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'counter_event.dart';
part 'counter_state.dart';

class CounterBloc extends Bloc<CounterEvent, CounterState> {
  CounterBloc() : super(CounterState.initial()) {
    // colorSubscription = colorBloc.stream.listen((ColorState colorState) {
    //   if (colorState.color == Colors.red) {
    //     incrementSize = 1;
    //   } else if (colorState.color == Colors.green) {
    //     incrementSize = 10;
    //   } else if (colorState.color == Colors.blue) {
    //     incrementSize = 100;
    //   } else if (colorState.color == Colors.black) {
    //     incrementSize = -100;
    //     add(ChangeCounterEvent());
    //   }
    // });
    on<ChangeCounterEvent>((event, emit) {
      emit(state.copyWith(counter: state.counter + event.incrementSize));
    });
  }
}
