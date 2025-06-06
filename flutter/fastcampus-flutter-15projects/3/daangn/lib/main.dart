import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:timeago/timeago.dart';

import 'app.dart';
import 'common/data/preference/app_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();
  await AppPreferences.init();

  setLocaleMessages('ko', KoMessages());

  runApp(EasyLocalization(
      supportedLocales: const [Locale('ko')],
      fallbackLocale: const Locale('ko'),
      path: 'assets/translations',
      useOnlyLangCode: true,
      child: const App()));
}
