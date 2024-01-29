import 'package:flutter/foundation.dart';

import '../../models/custom_error.dart';
import '../../models/user_model.dart';
import '../../repositories/profile_repository.dart';
import 'profile_state.dart';

class ProfileProvider with ChangeNotifier {
  ProfileState _state = ProfileState.initial();
  ProfileState get state => _state;

  final ProfileRepository profileRepository;
  ProfileProvider({
    required this.profileRepository,
  });

  Future<void> getProfile({required String uid}) async {
    _state = _state.copyWith(profileStatus: ProfileStatus.loading);
    notifyListeners();

    try {
      final User user = await profileRepository.getProfile(uid: uid);

      _state = _state.copyWith(profileStatus: ProfileStatus.loaded, user: user);
      notifyListeners();
    } on CustomError catch (e) {
      _state = _state.copyWith(profileStatus: ProfileStatus.error, error: e);
      notifyListeners();
    }
  }
}
