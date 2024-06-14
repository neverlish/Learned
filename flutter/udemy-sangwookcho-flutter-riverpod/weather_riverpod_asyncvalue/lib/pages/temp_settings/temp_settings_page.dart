import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class TempSettingsPage extends ConsumerStatefulWidget {
  const TempSettingsPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _TempSettingsPageState();
}

class _TempSettingsPageState extends ConsumerState<TempSettingsPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Temp Settings'),
      ),
      body: const Center(
        child: Text('Temp Settings'),
      ),
    );
  }
}
