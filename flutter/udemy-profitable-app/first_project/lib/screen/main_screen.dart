import 'package:flutter/material.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  TextEditingController idController = TextEditingController();
  String msg = '이 곳에 입력 값이 업데이트 됩니다!';
  ValueNotifier<int> counter = ValueNotifier<int>(0);

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
              // setState(() {
              //   msg = idController.text;
              // });
              counter.value = 30;
            },
            child: const Text('아이디 입력 값 가져오기 !'),
          ),
          ValueListenableBuilder<int>(
            valueListenable: counter,
            builder: (context, value, child) {
              return Text('Count : $value');
            },
          ),
          Text(
            msg,
            style: const TextStyle(fontSize: 30),
          ),
        ],
      ),
    );
  }
}
