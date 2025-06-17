import 'package:flutter/material.dart';

import 'core/theme/theme_data.dart';
import 'data/data_source/mock/display/display.mock_api.dart';
import 'presentation/routes/routes.dart';

void main() async {
  final data = await DisplayMockApi().getMenusByMallType('market');
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
