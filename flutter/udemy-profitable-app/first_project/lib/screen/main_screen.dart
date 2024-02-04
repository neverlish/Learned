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
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('반갑습니다.'),
            const Text('저는 유데미 강의를 듣고있는 학생입니다.'),
            const Text('저는 홍길동입니다.'),
            const Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                Text('안녕'),
                Text('반가워'),
                Text('이것은 가로 방향으로 쌓는 위젯이야.'),
              ],
            ),
            const Row(
              children: [
                Expanded(flex: 2, child: Text('홍길동')),
                Expanded(child: Text('홍길동')),
                Expanded(child: Text('홍길동')),
              ],
            ),
            Container(
              width: 300,
              height: 100,
              margin: const EdgeInsets.all(32),
              alignment: Alignment.center,
              decoration: BoxDecoration(
                color: Colors.blue,
                borderRadius: BorderRadius.circular(10),
              ),
              child: const Text('홍드로이드'),
            ),
            const Text(
              '홍드로이드2',
              style: TextStyle(
                color: Colors.green,
                fontWeight: FontWeight.bold,
                fontSize: 30,
              ),
            ),
            Row(
              children: [
                Image.asset(
                  "assets/car.png",
                  width: 100,
                  height: 100,
                ),
                const Icon(
                  Icons.home_filled,
                  size: 100,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
