import 'package:flutter/material.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('메인 화면'),
      ),
      body: Column(
        children: [
          Container(
            margin: const EdgeInsets.all(32),
            height: 70,
            width: 200,
            child: ElevatedButton(
              onPressed: () {
                print("버튼이 클릭되었습니다.");
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
                foregroundColor: Colors.yellow,
                elevation: 0,
              ),
              child: const Text('눌러보세요!'),
            ),
          )
        ],
      ),
    );
  }
}
