import 'package:daangn_ui/common/theme/color/abs_theme_colors.dart';
import 'package:daangn_ui/common/theme/custom_theme.dart';
import 'package:daangn_ui/common/theme/shadows/abs_theme_shadows.dart';
import 'package:flutter/material.dart';

class CustomThemeHolder extends InheritedWidget {
  final AbstractThemeColors appColors;
  final AbsThemeShadows appShadows;
  final CustomTheme theme;
  final Function(CustomTheme) changeTheme;

  CustomThemeHolder({
    required super.child,
    required this.theme,
    required this.changeTheme,
    super.key,
  })  : appColors = theme.appColors,
        appShadows = theme.appShadows;

  @override
  bool updateShouldNotify(CustomThemeHolder oldWidget) {
    final old = oldWidget.theme;
    final current = theme;
    final need = old != current;
    return need;
  }

  static CustomThemeHolder of(BuildContext context) {
    CustomThemeHolder inherited =
        (context.dependOnInheritedWidgetOfExactType<CustomThemeHolder>())!;
    return inherited;
  }
}
