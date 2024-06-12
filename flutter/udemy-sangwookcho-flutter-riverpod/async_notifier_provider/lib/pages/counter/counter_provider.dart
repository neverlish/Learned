import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

class Counter extends AsyncNotifier<int> {
  @override
  FutureOr<int> build() async {
    ref.onDispose(() {
      print('[counterProvider] disposed');
    });
    await waitSecond();
    return 0;
  }

  Future<void> waitSecond() => Future.delayed(const Duration(seconds: 1));

  Future<void> increment() async {
    state = const AsyncLoading();
    try {
      await waitSecond();
      throw 'Fail to increment!';
      state = AsyncData(state.value! + 1);
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
    }
  }

  Future<void> decrement() async {
    state = const AsyncLoading();
    try {
      await waitSecond();
      state = AsyncData(state.value! - 1);
    } catch (error, stackTrace) {
      state = AsyncError(error, stackTrace);
    }
  }
}

final counterProvider = AsyncNotifierProvider<Counter, int>(Counter.new);
