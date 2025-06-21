import 'package:flutter/material.dart';

final customTheme = ThemeData(
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.indigo,
  ),
  textTheme: const TextTheme(
    bodyLarge: TextStyle(
      fontWeight: FontWeight.normal,
      fontSize: 30,
    ),
  ),
  useMaterial3: true,
  // colorScheme: const ColorScheme.dark(),
  // colorScheme: ColorScheme.fromSeed(
  //   seedColor: Colors.indigo,
  // ),
  // colorScheme: const ColorScheme.light(
  //   primary: Colors.indigo,
  //   secondary: Colors.green,
  //   tertiary: Colors.yellow,
  // ),
  // appBarTheme: const AppBarTheme(
  //   backgroundColor: Colors.red,
  // ),
);
