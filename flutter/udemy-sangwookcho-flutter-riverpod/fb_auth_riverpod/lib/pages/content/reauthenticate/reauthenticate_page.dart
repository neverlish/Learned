import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class ReauthenticatePage extends ConsumerStatefulWidget {
  const ReauthenticatePage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _ReauthenticatePageState();
}

class _ReauthenticatePageState extends ConsumerState<ReauthenticatePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Reauthenticate'),
      ),
      body: const Center(
        child: Text('Reauthenticate'),
      ),
    );
  }
}
