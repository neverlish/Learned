import 'package:flutter/material.dart';
import 'package:go_riverpod/config/router/route_names.dart';
import 'package:go_router/go_router.dart';

class SecondPage extends StatelessWidget {
  const SecondPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Second'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Second Page'),
            const SizedBox(height: 10),
            FilledButton(
              onPressed: () {
                GoRouter.of(context).goNamed(
                  RouteNames.secondDetails,
                  pathParameters: {'id': '1'},
                );
              },
              child: const Text('View Second Details'),
            ),
            const SizedBox(height: 10),
            OutlinedButton(
              onPressed: () {
                GoRouter.of(context).go('/nowhere');
              },
              child: const Text('No Where'),
            ),
          ],
        ),
      ),
    );
  }
}
