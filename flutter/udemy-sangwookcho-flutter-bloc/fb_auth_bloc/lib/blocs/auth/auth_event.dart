part of 'auth_bloc.dart';

sealed class AuthEvent extends Equatable {
  const AuthEvent();

  @override
  List<Object?> get props => [];
}

final class AuthStateChangedEvent extends AuthEvent {
  final fbAuth.User? user;
  const AuthStateChangedEvent({
    this.user,
  });

  @override
  List<Object?> get props => [user];
}

final class SignoutRequestedEvent extends AuthEvent {}
