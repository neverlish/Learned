import 'package:fb_auth_provider/providers/auth/auth_state.dart';
import 'package:fb_auth_provider/repositories/auth_repository.dart';
import 'package:firebase_auth/firebase_auth.dart' as fbAuth;
import 'package:state_notifier/state_notifier.dart';

class AuthProvider extends StateNotifier<AuthState> with LocatorMixin {
  AuthProvider() : super(AuthState.unknown());

  @override
  void update(Locator watch) {
    final user = watch<fbAuth.User?>();
    if (user != null) {
      state = state.copyWith(
        status: AuthStatus.authenticated,
        user: user,
      );
    } else {
      state = state.copyWith(
        status: AuthStatus.unauthenticated,
        user: null,
      );
    }
    print('authState: $state');
    super.update(watch);
  }

  void signout() async {
    await read<AuthRepository>().signout();
  }
}
