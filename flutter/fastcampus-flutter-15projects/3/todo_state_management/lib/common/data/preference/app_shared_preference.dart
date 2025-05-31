import 'package:shared_preferences/shared_preferences.dart';

class AppSharedPreference {
  AppSharedPreference._();
  static AppSharedPreference instance = AppSharedPreference._();

  static const keyCount = 'count';
  static const keyLaunchCount = 'keyLaunchCount';

  late SharedPreferences _preferences;

  static init() async {
    instance._preferences = await SharedPreferences.getInstance();
  }

  static void setCount(int count) {
    instance._preferences.setInt(keyCount, count);
  }

  static int getCount() {
    return instance._preferences.getInt(keyCount) ?? 0;
  }
}
