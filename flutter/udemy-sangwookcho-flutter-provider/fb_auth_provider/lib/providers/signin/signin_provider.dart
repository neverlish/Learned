import 'package:fb_auth_provider/models/custom_error.dart';
import 'package:fb_auth_provider/providers/signin/signin_state.dart';
import 'package:fb_auth_provider/repositories/auth_repository.dart';
import 'package:flutter_state_notifier/flutter_state_notifier.dart';

class SigninProvider extends StateNotifier<SigninState> with LocatorMixin {
  SigninProvider() : super(SigninState.initial());

  Future<void> signin({
    required String email,
    required String password,
  }) async {
    state = state.copyWith(
      signinStatus: SigninStatus.submitting,
    );
    try {
      await read<AuthRepository>().signin(
        email: email,
        password: password,
      );
      state = state.copyWith(
        signinStatus: SigninStatus.success,
      );
    } on CustomError catch (e) {
      state = state.copyWith(
        signinStatus: SigninStatus.error,
        error: e,
      );
      rethrow;
    }
  }
}
