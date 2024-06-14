import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:todo_riverpod_sealed/pages/providers/theme/theme_state.dart';

part 'theme_provider.g.dart';

@riverpod
class Theme extends _$Theme {
  @override
  ThemeState build() {
    return const LightTheme();
  }

  void toggleTheme() {
    state = switch (state) {
      LightTheme() => const DarkTheme(),
      DarkTheme() => const LightTheme(),
    };
  }
}
