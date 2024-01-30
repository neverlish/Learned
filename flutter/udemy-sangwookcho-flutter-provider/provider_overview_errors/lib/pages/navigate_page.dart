import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/counter.dart';

class NavigatePage extends StatefulWidget {
  const NavigatePage({Key? key}) : super(key: key);

  @override
  State<NavigatePage> createState() => _NavigatePageState();
}

class _NavigatePageState extends State<NavigatePage> {
  @override
  Widget build(BuildContext context) {
    if (context.read<Counter>().counter == 3) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const OtherPage(),
          ),
        );
      });
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text('Navigate'),
      ),
      body: Center(
        child: Text(
          '${context.watch<Counter>().counter}',
          style: const TextStyle(fontSize: 40.0),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          context.read<Counter>().increment();
        },
      ),
    );
  }
}

class OtherPage extends StatelessWidget {
  const OtherPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Other Page'),
      ),
      body: const Center(
        child: Text(
          'Other',
          style: TextStyle(fontSize: 40.0),
        ),
      ),
    );
  }
}
