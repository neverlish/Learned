import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'auto_state_provider.g.dart';

@riverpod
class AuthState extends _$AuthState {
  @override
  bool build() {
    return false;
  }

  void setAuthenticate(bool value) {
    state = value;
  }
}
