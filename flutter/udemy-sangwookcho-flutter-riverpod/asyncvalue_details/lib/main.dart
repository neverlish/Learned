import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'pages/weather_first/weather_first_page.dart';
import 'pages/weather_second/weather_second_page.dart';
import 'widgets/custom_button.dart';

void main() {
  runApp(
    const ProviderScope(
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AsyncValue Details',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        textTheme: const TextTheme(
          bodyMedium: TextStyle(fontSize: 24),
          labelLarge: TextStyle(fontSize: 24),
        ),
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.symmetric(horizontal: 20),
          children: const [
            CustomButton(
              title: 'WeatherFirst',
              child: WeatherFirstPage(),
            ),
            CustomButton(
              title: 'WeatherSecond',
              child: WeatherSecondPage(),
            ),
          ],
        ),
      ),
    );
  }
}
