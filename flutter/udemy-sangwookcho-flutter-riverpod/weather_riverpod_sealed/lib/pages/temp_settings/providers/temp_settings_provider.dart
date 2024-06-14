import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:weather_riverpod_sealed/pages/temp_settings/providers/temp_settings_state.dart';

part 'temp_settings_provider.g.dart';

@Riverpod(keepAlive: true)
class TempSettings extends _$TempSettings {
  @override
  TempSettingsState build() {
    print('[tempSettingsProvider] initialized');
    ref.onDispose(() {
      print('[tempSettingsProvider] disposed');
    });
    return const Celsius();
  }

  void toggleTempUnit() {
    state = switch (state) {
      Celsius() => const Fahrenheit(),
      Fahrenheit() => const Celsius(),
    };
  }
}
