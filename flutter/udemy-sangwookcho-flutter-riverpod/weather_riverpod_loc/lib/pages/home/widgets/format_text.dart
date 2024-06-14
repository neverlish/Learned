import 'package:flutter/material.dart';
import 'package:recase/recase.dart';

class FormatText extends StatelessWidget {
  final String description;
  const FormatText({super.key, required this.description});

  @override
  Widget build(BuildContext context) {
    final formattedString = description.titleCase;

    return Text(
      formattedString,
      style: const TextStyle(fontSize: 24.0),
      textAlign: TextAlign.center,
    );
  }
}
