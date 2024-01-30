import 'package:flutter_state_notifier/flutter_state_notifier.dart';

import '../../models/custom_error.dart';
import '../../models/user_model.dart';
import '../../repositories/profile_repository.dart';
import 'profile_state.dart';

class ProfileProvider extends StateNotifier<ProfileState> with LocatorMixin {
  ProfileProvider() : super(ProfileState.initial());

  Future<void> getProfile({required String uid}) async {
    state = state.copyWith(profileStatus: ProfileStatus.loading);

    try {
      final User user = await read<ProfileRepository>().getProfile(uid: uid);

      state = state.copyWith(profileStatus: ProfileStatus.loaded, user: user);
    } on CustomError catch (e) {
      state = state.copyWith(profileStatus: ProfileStatus.error, error: e);
    }
  }
}
