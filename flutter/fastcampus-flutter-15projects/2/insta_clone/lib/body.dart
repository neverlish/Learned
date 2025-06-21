import 'package:flutter/material.dart';
import 'package:insta_clone/screen/home_screen.dart';
import 'package:insta_clone/screen/search_screen.dart';

class InstaBody extends StatelessWidget {
  final int index;
  const InstaBody({required this.index, super.key});

  @override
  Widget build(BuildContext context) {
    if (index == 0) {
      return const HomeScreen();
    }

    return const SearchScreen();
  }
}
