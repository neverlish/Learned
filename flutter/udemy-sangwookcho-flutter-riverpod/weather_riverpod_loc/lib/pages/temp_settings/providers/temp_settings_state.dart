sealed class TempSettingsState {
  const TempSettingsState();
}

final class Celsius extends TempSettingsState {
  const Celsius();

  @override
  String toString() => 'Celsius()';
}

final class Fahrenheit extends TempSettingsState {
  const Fahrenheit();

  @override
  String toString() => 'Fahrenheit()';
}
