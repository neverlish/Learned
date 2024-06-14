import 'package:flutter/material.dart';

class SelectCity extends StatelessWidget {
  const SelectCity({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        'Select a city',
        style: TextStyle(fontSize: 20.0),
      ),
    );
  }
}
