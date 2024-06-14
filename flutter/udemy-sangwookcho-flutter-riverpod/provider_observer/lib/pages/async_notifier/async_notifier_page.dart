import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'async_notifier_page.g.dart';

@riverpod
class CounterAsyncNotifier extends _$CounterAsyncNotifier {
  int _counter = 0;

  @override
  FutureOr<int> build() {
    return _generateInt(_counter);
  }

  Future<int> _generateInt(int counter) async {
    await Future.delayed(const Duration(seconds: 1));
    return counter;
  }

  Future<void> increment() async {
    state = const AsyncLoading<int>();

    state = await AsyncValue.guard(() => _generateInt(++_counter));
  }
}

class AsyncNotifierPage extends ConsumerWidget {
  const AsyncNotifierPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterAsyncNotifierProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('AsyncNotifierProvider'),
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
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          ref.read(counterAsyncNotifierProvider.notifier).increment();
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
