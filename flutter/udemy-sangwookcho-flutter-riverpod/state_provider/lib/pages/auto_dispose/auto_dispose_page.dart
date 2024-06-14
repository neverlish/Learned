import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'auto_dispose_provider.dart';

class AutoDisposePage extends ConsumerWidget {
  const AutoDisposePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final value = ref.watch(autoDisposeAgeProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('AutoDisposeStateProvider'),
      ),
      body: Center(
        child: Text(
          value,
          style: Theme.of(context).textTheme.headlineLarge,
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          ref
              .read(autoDisposeCounterProvider.notifier)
              .update((state) => state + 10);
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}