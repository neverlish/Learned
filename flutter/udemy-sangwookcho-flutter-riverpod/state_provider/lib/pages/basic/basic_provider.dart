import 'package:flutter_riverpod/flutter_riverpod.dart';

final counterProvider = StateProvider<int>((ref) {
  ref.onDispose(() {
    print('[counterProvider] disposed');
  });
  return 0;
});