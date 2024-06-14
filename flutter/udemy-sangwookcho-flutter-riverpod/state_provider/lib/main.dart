import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'pages/auto_dispose/auto_dispose_page.dart';
import 'pages/auto_dispose_family/auto_dispose_family_page.dart';
import 'pages/basic/basic_page.dart';
import 'pages/family/family_page.dart';
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
      title: 'StateProvider',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
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
      appBar: AppBar(
        title: const Text('StateProvider'),
      ),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.all(20),
          children: const [
            CustomButton(
              title: 'StateProvider',
              child: BasicPage(),
            ),
            CustomButton(
              title: 'AutoDisposeStateProvider',
              child: AutoDisposePage(),
            ),
            CustomButton(
              title: 'FamilyStateProvider',
              child: FamilyPage(),
            ),
            CustomButton(
              title: 'AutoDisposeFamilyStateProvider',
              child: AutoDisposeFamilyPage(),
            ),
          ],
        ),
      ),
    );
  }
}
