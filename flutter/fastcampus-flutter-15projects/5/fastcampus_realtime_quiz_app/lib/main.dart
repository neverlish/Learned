import 'package:fastcampus_realtime_quiz_app/quiz_app/pin_code_page.dart';
import 'package:fastcampus_realtime_quiz_app/web/quiz_manager_page.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

import 'firebase_options.dart';

FirebaseDatabase? database;


void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  String host = "";
  String baseUrl = "";

  try {
    if (defaultTargetPlatform == TargetPlatform.android) {
      host = "http://10.0.2.2:9000";
      baseUrl = "127.0.0.1";
    } else {
      host = "http://localhost:9000";
      baseUrl = "127.0.0.1";
    }
  } catch (e) {
    print(e.toString());
  }

  database = FirebaseDatabase.instanceFor(
    app: Firebase.app(),
    databaseURL: "$host?ns=fastcampus-realtime-quiz-jinho-default-rtdb",
  );

  await FirebaseAuth.instance.useAuthEmulator(baseUrl, 9099);

  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    if (defaultTargetPlatform == TargetPlatform.android ||
        defaultTargetPlatform == TargetPlatform.iOS) {
      return MaterialApp(
        title: '실시간 퀴즈 앱',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const PinCodePage(),
      );
    }
    return MaterialApp(
      title: '페스트캠퍼스 실시간 퀴즈 앱',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const QuizManagerPage(),
    );
  }
}
