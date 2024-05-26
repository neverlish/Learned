import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AutoDisposePage extends ConsumerWidget {
  const AutoDisposePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('AutoDisposeStateProvider'),
      ),
      body: const Center(
        child: Text('AutoDisposeStateProvider'),
      ),
    );
  }
}
