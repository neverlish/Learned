import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'futuer_provider_page.g.dart';

@riverpod
FutureOr<int> counterFuture(CounterFutureRef ref) async {
  await Future.delayed(const Duration(seconds: 1));
  return 0;
}

class FutureProviderPage extends ConsumerWidget {
  const FutureProviderPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterFutureProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('FutureProvider'),
      ),
      body: Center(
        child: counter.when(
          data: (count) => Text(
            '$count',
            style: Theme.of(context).textTheme.headlineLarge,
          ),
          error: (e, _) => Text(
            e.toString(),
            style: Theme.of(context)
                .textTheme
                .headlineLarge!
                .copyWith(color: Colors.red),
          ),
          loading: () => const CircularProgressIndicator(),
        ),
      ),
    );
  }
}
