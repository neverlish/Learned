import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_riverpod/config/router/auto_state_provider.dart';
import 'package:go_riverpod/config/router/route_names.dart';
import 'package:go_router/go_router.dart';

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
              onPressed: () {
                ref.read(authStateProvider.notifier).setAuthenticate(true);
              },
              child: const Text('Sign UP'),
            ),
            const SizedBox(height: 20.0),
            TextButton(
              onPressed: () {
                context.goNamed(RouteNames.signin);
              },
              child: const Text('Already a member? Sign IN!'),
            ),
            const SizedBox(height: 20.0),
            OutlinedButton(
              onPressed: () {
                context.goNamed(RouteNames.second);
              },
              child: const Text('Second'),
            ),
            const SizedBox(height: 20.0),
            OutlinedButton(
              onPressed: () {
                context.go('/nowhere');
              },
              child: const Text('No Where'),
            ),
          ],
        ),
      ),
    );
  }
}
