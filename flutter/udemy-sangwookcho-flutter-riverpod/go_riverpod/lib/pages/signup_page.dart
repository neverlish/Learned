import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SignupPage extends ConsumerWidget {
  const SignupPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign UP'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FilledButton(
              onPressed: () {},
              child: const Text('Sign UP'),
            ),
            const SizedBox(height: 20.0),
            TextButton(
              onPressed: () {},
              child: const Text('Already a member? Sign IN!'),
            ),
            const SizedBox(height: 20.0),
            OutlinedButton(
              onPressed: () {},
              child: const Text('Second'),
            ),
            const SizedBox(height: 20.0),
            OutlinedButton(
              onPressed: () {},
              child: const Text('No Where'),
            ),
          ],
        ),
      ),
    );
  }
}
