import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SyncKeepAlivePage extends ConsumerWidget {
  const SyncKeepAlivePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('SyncKeepAlive'),
      ),
      body: const Center(
        child: Text('SyncKeepAlive'),
      ),
    );
  }
}
