import 'package:flutter/material.dart';

class SecondPage extends StatelessWidget {
  const SecondPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Second Page'),
            const SizedBox(height: 10),
            FilledButton(
              onPressed: () {},
              child: const Text('View Second Details'),
            ),
          ],
        ),
      ),
    );
  }
}
