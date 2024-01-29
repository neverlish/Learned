import 'package:equatable/equatable.dart';

import '../../models/custom_error.dart';

enum SignupStatus {
  initial,
  submitting,
  success,
  error,
}

class SignupState extends Equatable {
  final SignupStatus signupStatus;
  final CustomError error;

  const SignupState({
    required this.signupStatus,
    required this.error,
  });

  factory SignupState.initial() {
    return const SignupState(
      signupStatus: SignupStatus.initial,
      error: CustomError(),
    );
  }

  @override
  List<Object> get props => [signupStatus, error];

  @override
  bool get stringify => true;

  SignupState copyWith({
    SignupStatus? signupStatus,
    CustomError? error,
  }) {
    return SignupState(
      signupStatus: signupStatus ?? this.signupStatus,
      error: error ?? this.error,
    );
  }
}
