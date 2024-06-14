sealed class ThemeState {
  const ThemeState();
}

final class LightTheme extends ThemeState {
  const LightTheme();

  @override
  String toString() => 'LightTheme()';
}

final class DarkTheme extends ThemeState {
  const DarkTheme();

  @override
  String toString() => 'DarkTheme()';
}
