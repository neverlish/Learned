import 'package:firebase_messaging/firebase_messaging.dart';

class FcmManager {
  static void requestPermission() {
    FirebaseMessaging.instance.requestPermission();
  }

  static void initialize() async {
    final token = await FirebaseMessaging.instance.getToken();
    print(token);
  }
}
