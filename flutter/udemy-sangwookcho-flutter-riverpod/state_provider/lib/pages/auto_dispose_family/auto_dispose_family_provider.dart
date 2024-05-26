import 'package:flutter_riverpod/flutter_riverpod.dart';

final autoDisposeFamilyCounterProvider =
    StateProvider.autoDispose.family<int, int>((ref, initialValue) {
  ref.onDispose(() {
    print('[autoDisposeFamilyCounterProvider($initialValue)] disposed');
  });
  return initialValue;
});