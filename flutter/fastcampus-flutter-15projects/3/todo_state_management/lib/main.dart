import 'package:easy_localization/easy_localization.dart';
import 'package:fast_app_base/data/source/local/todo_db.dart';
import 'package:flutter/material.dart';

import 'common/di/di.dart';
import 'presentation/app.dart';
import 'common/data/preference/app_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();
  await AppPreferences.init();
  await TodoDB.init();

  configureDependencies();

  runApp(EasyLocalization(
      supportedLocales: const [Locale('en'), Locale('ko')],
      fallbackLocale: const Locale('en'),
      path: 'assets/translations',
      useOnlyLangCode: true,
      child: const App()));
}
