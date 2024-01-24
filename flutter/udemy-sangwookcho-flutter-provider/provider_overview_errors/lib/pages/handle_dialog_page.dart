import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../providers/counter.dart';

class HandleDialogPage extends StatefulWidget {
  const HandleDialogPage({Key? key}) : super(key: key);

  @override
  State<HandleDialogPage> createState() => _HandleDialogPageState();
}

class _HandleDialogPageState extends State<HandleDialogPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Handle Dialog'),
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
