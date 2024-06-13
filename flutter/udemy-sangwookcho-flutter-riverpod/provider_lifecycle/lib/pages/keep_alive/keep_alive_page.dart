import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class KeepAlivePage extends ConsumerWidget {
  const KeepAlivePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('KeepAlive'),
      ),
      body: const Center(
        child: Text('KeepAlive'),
      ),
    );
  }
}
