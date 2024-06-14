import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../repositories/auth_repository_provider.dart';

part 'change_password_provider.g.dart';

@riverpod
class ChangePassword extends _$ChangePassword {
  @override
  FutureOr<void> build() {}

  Future<void> changePassword(String password) async {
    state = const AsyncLoading<void>();

    state = await AsyncValue.guard<void>(
      () => ref.read(authRepositoryProvider).changePassword(password),
    );
  }
}
