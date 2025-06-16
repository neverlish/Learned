import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../routes/routes_path.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('splash')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'splash_page',
              style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
            ),
            ElevatedButton(
              onPressed: () => context.push(RoutePath.home),
              child: Text('go home'),
            ),
          ],
        ),
      ),
    );
  }
}
