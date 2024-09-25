import 'package:flutter/material.dart';
import 'package:video_call/screen/home_screen.dart';
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(MaterialApp(
    home: HomeScreen(),
  ));
}
