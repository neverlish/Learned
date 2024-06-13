import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:sync_provider_for_async_apis/main.dart';

class OtherPage extends StatelessWidget {
  const OtherPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Other'),
      ),
      body: Center(child: Consumer(
        builder: (context, ref, child) {
          final preferences = ref.watch(sharedPreferencesProvider);
          final val = preferences.getInt('counter');

          return Text(
            '$val',
            style: const TextStyle(fontSize: 52),
          );
        },
      )),
    );
  }
}
