import 'dart:async';

import 'package:flutter_riverpod/flutter_riverpod.dart';

class Counter extends AutoDisposeFamilyAsyncNotifier<int, int> {
  @override
  FutureOr<int> build(int arg) async {
    ref.onDispose(() {
      print('[counterProvider] disposed');
    });
    await waitSecond();
    return arg;
  }

  // @override
  // FutureOr<int> build() async {
  //   ref.onDispose(() {
  //     print('[counterProvider] disposed');
  //   });
  //   return Future.value(0);
  // }

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

final counterProvider =
    AsyncNotifierProvider.autoDispose.family<Counter, int, int>(Counter.new);
