import 'package:equatable/equatable.dart';
import 'package:firebase_auth/firebase_auth.dart' as fbAuth;

enum AuthStatus {
  unknown,
  authenticated,
  unauthenticated,
}

class AuthState extends Equatable {
  final AuthStatus authStatus;
  final fbAuth.User? user;

  const AuthState({
    required this.authStatus,
    this.user,
  });

  factory AuthState.unknown() {
    return const AuthState(authStatus: AuthStatus.unknown);
  }

  @override
  List<Object?> get props => [
        authStatus,
        user,
      ];

  @override
  bool get stringify => true;

  AuthState copyWith({
    AuthStatus? status,
    fbAuth.User? user,
  }) {
    return AuthState(
      authStatus: status ?? authStatus,
      user: user ?? this.user,
    );
  }
}
