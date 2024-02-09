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
          TextButton(
            onPressed: () {
              Navigator.pushNamed(context, '/sub', arguments: 'hello');
            },
            child: const Text('클릭하여 서브 화면으로 이동'),
          ),
        ],
      ),
      drawer: Drawer(
        child: ListView(
          children: [
            const DrawerHeader(
              child: Text('헤더 영역'),
            ),
            ListTile(
              title: const Text('홈 화면'),
              onTap: () {},
            ),
            ListTile(
              title: const Text('메인 화면'),
              onTap: () {},
            ),
            ListTile(
              title: const Text('서브 화면'),
              onTap: () {},
            ),
          ],
        ),
      ),
    );
  }
}
