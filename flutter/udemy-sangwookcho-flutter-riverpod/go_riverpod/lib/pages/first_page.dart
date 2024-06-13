import 'package:flutter/material.dart';

class FirstPage extends StatelessWidget {
  const FirstPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('First Page'),
            const SizedBox(height: 10),
            FilledButton(
              onPressed: () {},
              child: const Text('View First Details'),
            ),
          ],
        ),
      ),
    );
  }
}
