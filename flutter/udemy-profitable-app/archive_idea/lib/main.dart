import 'package:archive_idea/data/idea_info.dart';
import 'package:archive_idea/screen/detail_screen.dart';
import 'package:archive_idea/screen/edit_screen.dart';
import 'package:archive_idea/screen/main_screen.dart';
import 'package:archive_idea/screen/splash_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Business Card',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => const SplashScreen(),
        '/main': (context) => const MainScreen(),
      },
      onGenerateRoute: (settings) {
        if (settings.name == '/edit') {
          final IdeaInfo? ideaInfo = settings.arguments as IdeaInfo?;
          return MaterialPageRoute(builder: (context) {
            return EditScreen(ideaInfo: ideaInfo);
          });
        } else if (settings.name == '/detail') {
          final IdeaInfo? ideaInfo = settings.arguments as IdeaInfo?;
          return MaterialPageRoute(builder: (context) {
            return DetailScreen(ideaInfo: ideaInfo);
          });
        }
        return null;
      },
    );
  }
}
