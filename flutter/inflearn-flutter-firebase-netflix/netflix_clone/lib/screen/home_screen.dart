import 'package:flutter/material.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return const TopBar();
  }
}

class TopBar extends StatelessWidget {
  const TopBar({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(20, 7, 20, 7),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Image.asset(
            'images/bbongflix_logo.png',
            fit: BoxFit.contain,
            height: 25,
          ),
          Container(
            padding: const EdgeInsets.only(right: 1),
            child: const Text(
              'TV 프로그램',
              style: TextStyle(
                fontSize: 14,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.only(right: 1),
            child: const Text(
              '영화',
              style: TextStyle(
                fontSize: 14,
              ),
            ),
          ),
          Container(
            padding: const EdgeInsets.only(right: 1),
            child: const Text(
              '내가 찜한 콘텐츠',
              style: TextStyle(
                fontSize: 14,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
