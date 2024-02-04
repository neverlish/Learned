import 'package:flutter/material.dart';

class SubScreen extends StatelessWidget {
  final String msg;

  const SubScreen({
    super.key,
    required this.msg,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('서브 화면'),
      ),
      body: Column(
        children: [
          Center(
            child: Text('서브 화면 입니다. $msg'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text('뒤로가기'),
          ),
        ],
      ),
    );
  }
}
