import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../repositories/auth_repository_provider.dart';

part 'reset_password_provider.g.dart';

@riverpod
class ResetPassword extends _$ResetPassword {
  @override
  FutureOr<void> build() {}

  Future<void> resetPassword({required String email}) async {
    state = const AsyncLoading<void>();

    state = await AsyncValue.guard<void>(
      () => ref.read(authRepositoryProvider).sendPasswordResetEmail(email),
    );
  }
}
