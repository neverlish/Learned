import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'stream_provider_page.g.dart';

@riverpod
Stream<int> counterStream(CounterStreamRef ref) {
  return Stream<int>.periodic(const Duration(seconds: 1), (i) => i).take(5);
}

class StreamProviderPage extends ConsumerWidget {
  const StreamProviderPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterStreamProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('StreamProvider'),
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
