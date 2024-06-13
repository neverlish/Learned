import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ProviderCascadePage extends ConsumerWidget {
  const ProviderCascadePage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Provider Cascade'),
      ),
      body: const Center(
        child: Text('Provider Cascade'),
      ),
    );
  }
}
