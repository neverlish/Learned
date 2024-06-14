import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'basic_provider.g.dart';

final counterProvider = StateProvider<int>((ref) {
  ref.onDispose(() {
    print('[counterProvider] disposed');
  });
  return 0;
});

@Riverpod(keepAlive: true)
String age(AgeRef ref) {
// ignore: avoid_manual_providers_as_generated_provider_dependency
  final age = ref.watch(counterProvider);
  ref.onDispose(() {
    print('[ageProvider] disposed');
  });
  return 'Hi! I am $age years old.';
}