import 'package:firebase_auth/firebase_auth.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../constants/firebase_constants.dart';
import 'auth_repository.dart';

part 'auth_repository_provider.g.dart';

@riverpod
AuthRepository authRepository(AuthRepositoryRef ref) {
  return AuthRepository();
}

@riverpod
Stream<User?> authStateStream(AuthStateStreamRef ref) {
  return fbAuth.authStateChanges();
}
