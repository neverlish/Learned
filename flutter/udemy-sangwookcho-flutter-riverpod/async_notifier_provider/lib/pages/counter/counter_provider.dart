import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'counter_provider.g.dart';

@riverpod
class Counter extends _$Counter {
  @override
  FutureOr<int> build(int initialValue) {
    ref.onDispose(() {
      print('[counterProvider] disposed');
    });
    return 0;
  }

  Future<void> waitSecond() => Future.delayed(const Duration(seconds: 1));

  Future<void> increment() async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      await waitSecond();
      // if (state.value! == 2) {
      //   throw 'Fail to increment';
      // }
      return state.value! + 1;
    });
    // try {
    //   await waitSecond();
    //   // throw 'Fail to increment!';
    //   state = AsyncData(state.value! + 1);
    // } catch (error, stackTrace) {
    //   state = AsyncError(error, stackTrace);
    // }
  }

  Future<void> decrement() async {
    state = const AsyncLoading();

    state = await AsyncValue.guard(() async {
      await waitSecond();
      return state.value! - 1;
    });
    // try {
    //   await waitSecond();
    //   state = AsyncData(state.value! - 1);
    // } catch (error, stackTrace) {
    //   state = AsyncError(error, stackTrace);
    // }
  }
}
