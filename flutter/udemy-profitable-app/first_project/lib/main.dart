import 'package:first_project/screen/main_screen.dart';
import 'package:first_project/screen/splash_screen.dart';
import 'package:first_project/screen/sub_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/main': (context) => const MainScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/sub') {
          String msg = settings.arguments as String;
          return MaterialPageRoute(
            builder: (context) {
              return SubScreen(
                msg: msg,
              );
            },
          );
        }
        return null;
      },
    );
  }
}
