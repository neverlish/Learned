import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_riverpod/config/router/auto_state_provider.dart';
import 'package:go_riverpod/config/router/route_names.dart';
import 'package:go_router/go_router.dart';

class SigninPage extends ConsumerWidget {
  const SigninPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign IN'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            FilledButton(
              onPressed: () async {
                await ref
                    .read(authStateProvider.notifier)
                    .setAuthenticate(true);
              },
              child: const Text('Sign IN'),
            ),
            const SizedBox(height: 20.0),
            TextButton(
              onPressed: () {
                context.goNamed(RouteNames.signup);
              },
              child: const Text('Not a member? Sign UP!'),
            ),
            const SizedBox(height: 20.0),
            OutlinedButton(
              onPressed: () {
                context.goNamed(RouteNames.first);
              },
              child: const Text('First'),
            ),
          ],
        ),
      ),
    );
  }
}
