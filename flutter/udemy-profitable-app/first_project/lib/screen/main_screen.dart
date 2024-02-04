import 'package:flutter/material.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  List lstHello = ['홍드로이드', '안녕하세요', '반갑습니다', '즐거운 식사시간 되세요'];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('메인 화면'),
      ),
      body: ListView.builder(
        itemBuilder: (context, index) {
          return ListTile(
            title: Text("${lstHello[index]}"),
            subtitle: const Text('서브타이틀'),
          );
        },
        itemCount: lstHello.length,
      ),
    );
  }
}
