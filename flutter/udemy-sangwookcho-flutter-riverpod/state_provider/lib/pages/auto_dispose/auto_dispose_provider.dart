import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auto_dispose_provider.g.dart';

final autoDisposeCounterProvider = StateProvider.autoDispose<int>((ref) {
  ref.onDispose(() {
    print('[autoDisposeCounterProvider] disposed');
  });
  return 0;
});

@Riverpod(keepAlive: false)
String autoDisposeAge(AutoDisposeAgeRef ref) {
// ignore: avoid_manual_providers_as_generated_provider_dependency
  final age = ref.watch(autoDisposeCounterProvider);
  ref.onDispose(() {
    print('[autoDisposeAgeProvider] disposed');
  });
  return 'Hi! I am $age years old.';
}