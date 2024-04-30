import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'theme_state.dart';

class ThemeCubit extends Cubit<ThemeState> {
  ThemeCubit() : super(ThemeState.initial());

  void changeTheme(int randInt) {
    if (randInt % 2 == 0) {
      emit(const ThemeState(appTheme: AppTheme.light));
    } else {
      emit(const ThemeState(appTheme: AppTheme.dark));
    }
  }
}
