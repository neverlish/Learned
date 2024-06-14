import 'package:flutter/material.dart';
import 'package:stream_provider/timer/action_buttons.dart';
import 'package:stream_provider/timer/timer_value.dart';

class TimerPage extends StatelessWidget {
  const TimerPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Timer'),
      ),
      body: const Center(
          child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          TimerValue(),
          SizedBox(height: 20),
          ActionButtons(),
        ],
      )),
    );
  }
}
