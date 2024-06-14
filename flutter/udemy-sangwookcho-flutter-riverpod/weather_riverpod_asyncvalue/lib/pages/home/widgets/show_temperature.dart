import 'package:flutter/material.dart';

class ShowTemperature extends StatelessWidget {
  final double temperature;
  final double fontSize;
  final FontWeight fontWeight;
  const ShowTemperature({
    Key? key,
    required this.temperature,
    required this.fontSize,
    this.fontWeight = FontWeight.normal,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final currentTemperature = '${temperature.toStringAsFixed(2)}\u2103';

    return Text(
      currentTemperature,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: fontWeight,
      ),
    );
  }
}
