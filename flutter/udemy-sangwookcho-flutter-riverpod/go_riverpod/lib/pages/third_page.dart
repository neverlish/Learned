import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_riverpod/config/router/auto_state_provider.dart';
import 'package:go_riverpod/config/router/route_names.dart';
import 'package:go_router/go_router.dart';

class ThirdPage extends ConsumerWidget {
  const ThirdPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Third'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Third Page'),
            const SizedBox(height: 10),
            FilledButton(
              onPressed: () {
                GoRouter.of(context).goNamed(
                  RouteNames.thirdDetails,
                  pathParameters: {'id': '2'},
                  queryParameters: {'firstName': 'John'},
                );
              },
              child: const Text('View Third Details'),
            ),
            const SizedBox(height: 10),
            OutlinedButton(
              onPressed: () {
                context.goNamed(RouteNames.signin);
              },
              child: const Text('Sign In'),
            ),
            const SizedBox(height: 10),
            OutlinedButton(
              onPressed: () async {
                await ref
                    .read(authStateProvider.notifier)
                    .setAuthenticate(false);
              },
              child: const Text('Sign Out'),
            ),
          ],
        ),
      ),
    );
  }
}
