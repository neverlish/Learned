import 'package:flutter/material.dart';

class FirstDetailsPage extends StatefulWidget {
  const FirstDetailsPage({super.key});

  @override
  State<FirstDetailsPage> createState() => _FirstDetailsPageState();
}

class _FirstDetailsPageState extends State<FirstDetailsPage> {
  int counter = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Details Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$counter',
              style: Theme.of(context).textTheme.headlineLarge,
            ),
            const SizedBox(height: 20),
            FilledButton(
              onPressed: () {
                setState(() => counter++);
              },
              child: const Text('Increment Counter'),
            ),
          ],
        ),
      ),
    );
  }
}
