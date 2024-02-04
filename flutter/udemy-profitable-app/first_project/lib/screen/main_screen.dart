import 'package:flutter/material.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  List lstHello = ['홍드로이드', '안녕하세요', '반갑습니다', '즐거운 식사시간 되세요'];
  TextEditingController idController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('메인 화면'),
      ),
      body: Column(
        children: [
          TextField(
            controller: idController,
            decoration: const InputDecoration(
              border: OutlineInputBorder(),
              labelText: '아이디를 입력해주세요.',
            ),
          ),
          ElevatedButton(
            onPressed: () {
              print(idController.text);
            },
            child: const Text('아이디 입력 값 가져오기 !'),
          ),
        ],
      ),
    );
  }
}
