import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Example2Page extends ConsumerWidget {
  const Example2Page({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Usage Example 2'),
      ),
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CounterDisplay(),
            Divider(height: 40),
            CounterDisplay(),
            Divider(height: 40),
            CounterDisplay(),
            Divider(height: 40),
            CounterDisplay(),
          ],
        ),
      ),
    );
  }
}

class CounterDisplay extends ConsumerWidget {
  const CounterDisplay({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('0'),
            SizedBox(width: 30),
            Text('0'),
          ],
        ),
        const SizedBox(height: 10),
        OutlinedButton(
          onPressed: () {},
          child: const Text('Increment Counter'),
        ),
      ],
    );
  }
}
