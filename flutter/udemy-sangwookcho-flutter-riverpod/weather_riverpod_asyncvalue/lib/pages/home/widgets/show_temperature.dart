import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:weather_riverpod_asyncvalue/pages/temp_settings/providers/temp_settings_provider.dart';
import 'package:weather_riverpod_asyncvalue/pages/temp_settings/providers/temp_settings_state.dart';

class ShowTemperature extends ConsumerWidget {
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
  Widget build(BuildContext context, WidgetRef ref) {
    final tempUnit = ref.watch(tempSettingsProvider);

    final currentTemperature = switch (tempUnit) {
      Celsius() => '${temperature.toStringAsFixed(2)}\u2103',
      Fahrenheit() => '${(temperature * 9 / 5 + 32).toStringAsFixed(2)}\u2109',
    };

    return Text(
      currentTemperature,
      style: TextStyle(
        fontSize: fontSize,
        fontWeight: fontWeight,
      ),
    );
  }
}
