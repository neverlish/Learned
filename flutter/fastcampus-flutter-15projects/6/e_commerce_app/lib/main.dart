import 'package:flutter/material.dart';

import 'core/theme/theme_data.dart';
import 'data/data_source/mock/display/display.mock_api.dart';
import 'presentation/routes/routes.dart';
import 'service_locator.dart';

void main() async {
  setLocator();

  final data = await DisplayMockApi().getViewModulesByTabId(10001);
  print(data);
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: router,
      theme: CustomThemeData.themeData,
    );
  }
}
