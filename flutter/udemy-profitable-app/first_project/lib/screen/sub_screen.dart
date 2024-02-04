import 'package:flutter/material.dart';

class SubScreen extends StatelessWidget {
  final String msg;

  const SubScreen({
    super.key,
    required this.msg,
  });

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          automaticallyImplyLeading: false,
          leading: TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: const Text(
              "뒤로가기",
              // style: TextStyle(color: Colors.white),
            ),
          ),
          title: const Text('서브 화면'),
          actions: const [
            Icon(Icons.ac_unit_outlined),
          ],
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Tab 1'),
              Tab(text: 'Tab 2'),
              Tab(text: 'Tab 3'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            Center(child: Text('Tab 1 Content')),
            Center(child: Text('Tab 2 Content')),
            Center(child: Text('Tab 3 Content')),
          ],
        ),
      ),
    );
  }
}
