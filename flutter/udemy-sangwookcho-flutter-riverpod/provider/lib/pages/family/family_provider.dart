// import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'family_provider.g.dart';

// final familyHelloProvider = Provider.family<String, String>((ref, name) {
//   ref.onDispose(() {
//     print('[familyHelloProvider($name)] disposed');
//   });
//   return 'Hello $name';
// });

@Riverpod(keepAlive: true)
String familyHello(FamilyHelloRef ref, String there) {
  ref.onDispose(() {
    print('[familyHelloProvider($there)] disposed');
  });
  return 'Hello $there';
}