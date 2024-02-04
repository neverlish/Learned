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
      body: const Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('반갑습니다.'),
            Text('저는 유데미 강의를 듣고있는 학생입니다.'),
            Text('저는 홍길동입니다.'),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text('안녕'),
                Text('반가워'),
                Text('이것은 가로 방향으로 쌓는 위젯이야.'),
              ],
            ),
            Row(
              children: [
                Expanded(flex: 2, child: Text('홍길동')),
                Expanded(child: Text('홍길동')),
                Expanded(child: Text('홍길동')),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
