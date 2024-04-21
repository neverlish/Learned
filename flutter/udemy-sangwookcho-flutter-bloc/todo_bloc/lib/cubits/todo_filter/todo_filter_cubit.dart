import 'package:bloc/bloc.dart';
import 'package:todo_bloc/models/todo_model.dart';

part 'todo_filter_state.dart';

class TodoFilterCubit extends Cubit<TodoFilterState> {
  TodoFilterCubit() : super(TodoFilterState.initial());

  void changeFilter(Filter newFilte) {
    emit(state.copyWith(filter: newFilte));
  }
}
