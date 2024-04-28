part of 'theme_bloc.dart';

sealed class ThemeEvent extends Equatable {
  const ThemeEvent();

  @override
  List<Object> get props => [];
}

class ChangeThemeEvent extends ThemeEvent {
  const ChangeThemeEvent({
    required this.appTheme,
  });

  final AppTheme appTheme;

  @override
  List<Object> get props => [appTheme];
}
