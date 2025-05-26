import 'package:flutter/material.dart';
import 'package:flutter_example/style/theme.dart';

void main() {
  runApp(
    MaterialApp(
    home: const HomeWidget(),
    theme: customTheme,
  ));
}

class HomeWidget extends StatefulWidget {
  const HomeWidget({super.key});

  @override
  State<HomeWidget> createState() => _HomeWidgetState();
}

class _HomeWidgetState extends State<HomeWidget> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    // final textTheme = Theme.of(context).textTheme;
    final textTheme = customTheme.textTheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Flutter Theme'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Press Count', style: textTheme.bodyLarge),
            Text('Count: $count', style: textTheme.displayLarge),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() {
          count++;
        }),
      ),
    );
  }
}
