import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'pages/auto_dispose/auto_dispose_page.dart';
import 'pages/keep_alive/keep_alive_page.dart';
import 'pages/provider_cascade/provider_cascade_page.dart';
import 'pages/sync_keep_alive/sync_keep_alive_page.dart';
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
      title: 'Provider Lifecycle',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
        textTheme: const TextTheme(
          bodyMedium: TextStyle(fontSize: 48),
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
      appBar: AppBar(
        title: const Text('Provider Lifecycle'),
      ),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          padding: const EdgeInsets.symmetric(horizontal: 30),
          children: const [
            CustomButton(
              title: 'AutoDispose',
              child: AutoDisposePage(),
            ),
            CustomButton(
              title: 'KeepAlive',
              child: KeepAlivePage(),
            ),
            CustomButton(
              title: 'ProviderCascade',
              child: ProviderCascadePage(),
            ),
            CustomButton(
              title: 'SyncKeepAlive',
              child: SyncKeepAlivePage(),
            ),
          ],
        ),
      ),
    );
  }
}
