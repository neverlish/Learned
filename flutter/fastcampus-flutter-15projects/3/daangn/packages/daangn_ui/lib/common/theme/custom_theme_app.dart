import 'package:flutter/material.dart';

import 'custom_theme.dart';
import 'custom_theme_holder.dart';
import 'theme_util.dart';

class CustomThemeApp extends StatefulWidget {
  final Widget child;
  final CustomTheme? defaultTheme;
  final CustomTheme? savedTheme;

  static late ValueChanged<CustomTheme> saveThemeFunction;

  static void init({required ValueChanged<CustomTheme> saveThemeFunction}) {
    CustomThemeApp.saveThemeFunction = saveThemeFunction;
  }

  const CustomThemeApp(
      {super.key, required this.child, this.defaultTheme, this.savedTheme});

  @override
  State<CustomThemeApp> createState() => _CustomThemeAppState();
}

class _CustomThemeAppState extends State<CustomThemeApp> {
  late CustomTheme theme =
      widget.savedTheme ?? widget.defaultTheme ?? systemTheme;

  void handleChangeTheme(CustomTheme theme) {
    setState(() => this.theme = theme);
    CustomThemeApp.saveThemeFunction(theme);
  }

  @override
  Widget build(BuildContext context) {
    return CustomThemeHolder(
      changeTheme: handleChangeTheme,
      theme: theme,
      child: widget.child,
    );
  }

  CustomTheme get systemTheme {
    switch (ThemeUtil.systemBrightness) {
      case Brightness.dark:
        return CustomTheme.dark;
      case Brightness.light:
        return CustomTheme.light;
    }
  }
}
