part of 'theme_cubit.dart';

enum AppTheme {
  light,
  dark,
}

final class ThemeState extends Equatable {
  const ThemeState({
    this.appTheme = AppTheme.light,
  });

  factory ThemeState.initial() {
    return const ThemeState();
  }

  final AppTheme appTheme;

  @override
  List<Object> get props => [appTheme];

  @override
  String toString() => 'ThemeState(appTheme: $appTheme)';

  ThemeState copyWith({
    AppTheme? appTheme,
  }) {
    return ThemeState(
      appTheme: appTheme ?? this.appTheme,
    );
  }
}
