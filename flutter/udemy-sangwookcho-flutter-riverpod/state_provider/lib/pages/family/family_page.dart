import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'family_provider.dart';

class FamilyPage extends ConsumerWidget {
  const FamilyPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final incVal = ref.watch(familyCounterProvider(10));
    final decVal = ref.watch(familyCounterProvider(-10));

    return Scaffold(
      appBar: AppBar(
        title: const Text('FamilyStateProvider'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  '$incVal',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                const SizedBox(width: 20),
                FilledButton(
                  onPressed: () {
                    ref
                        .read(familyCounterProvider(10).notifier)
                        .update((state) => state + 10);
                  },
                  child: const Text(
                    'Increment',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  '$decVal',
                  style: Theme.of(context).textTheme.headlineLarge,
                ),
                const SizedBox(width: 20),
                FilledButton(
                  onPressed: () {
                    ref
                        .read(familyCounterProvider(-10).notifier)
                        .update((state) => state - 10);
                  },
                  child: const Text(
                    'Decrement',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}