import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'counter_provider.g.dart';

// class Counter extends AutoDisposeNotifier<int> {
//   @override
//   int build() {
//     ref.onDispose(() {
//       print('[counterProvider] disposed');
//     });
//     return 0;
//   }

//   void increment() {
//     state++;
//   }
// }

// final counterProvider = NotifierProvider.autoDispose<Counter, int>(Counter.new);

// class Counter extends AutoDisposeFamilyNotifier<int, int> {
//   @override
//   int build(int arg) {
//     ref.onDispose(() {
//       print('[counterProvider] disposed');
//     });
//     return arg;
//   }

//   void increment() {
//     state++;
//   }
// }

// final counterProvider =
//     NotifierProvider.autoDispose.family<Counter, int, int>(Counter.new);

@riverpod
class Counter extends _$Counter {
  @override
  int build(int initialValue) {
    ref.onDispose(() {
      print('[counterProvider] disposed');
    });
    return initialValue;
  }

  void increment() {
    state++;
  }
}
