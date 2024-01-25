import 'package:flutter/foundation.dart';

enum AppState {
  initial,
  loading,
  success,
  error,
}

class AppProvider with ChangeNotifier {
  AppState _state = AppState.initial;
  AppState get state => _state;

  Future<void> getResult(String searchTerm) async {
    _state = AppState.loading;
    notifyListeners();

    await Future.delayed(const Duration(seconds: 2));

    try {
      if (searchTerm == 'fail') {
        throw 'Something went wrong';
      }

      _state = AppState.success;
      notifyListeners();
    } catch (e) {
      _state = AppState.error;
      notifyListeners();
      rethrow;
    }
  }
}
