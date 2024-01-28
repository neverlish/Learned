import 'package:fb_auth_provider/providers/auth/auth_state.dart';
import 'package:fb_auth_provider/repositories/auth_repository.dart';
import 'package:firebase_auth/firebase_auth.dart' as fbAuth;
import 'package:flutter/material.dart';

class AuthProvider with ChangeNotifier {
  AuthState _state = AuthState.unknown();

  AuthState get state => _state;

  final AuthRepository authRepository;

  AuthProvider({
    required this.authRepository,
  });

  void update(fbAuth.User? user) {
    if (user != null) {
      _state = _state.copyWith(
        status: AuthStatus.authenticated,
        user: user,
      );
    } else {
      _state = _state.copyWith(
        status: AuthStatus.unauthenticated,
        user: null,
      );
    }
    print('authState: $_state');
    notifyListeners();
  }

  void signout() async {
    await authRepository.signout();
  }
}
