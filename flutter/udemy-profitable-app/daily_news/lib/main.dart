import 'package:daily_news/screen/main_screen.dart';
import 'package:daily_news/screen/splash_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Daily News',
      routes: {
        '/': (context) => const SplashScreen(),
        '/main': (context) => const MainScreen(),
      },
    );
  }
}
