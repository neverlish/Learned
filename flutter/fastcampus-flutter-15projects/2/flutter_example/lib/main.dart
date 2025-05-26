import 'package:flutter/material.dart';
import 'package:flutter_example/screen/new_page.dart';
import 'package:go_router/go_router.dart';

const assetImagePath = 'assets/images/';
const bannerImage = '$assetImagePath/banner.png';

void main() {
  runApp(
    MaterialApp.router(
      routerConfig: GoRouter(
        initialLocation: '/',
        routes: [
          GoRoute(
            path: "/",
            name: 'home',
            builder: (context, _) => const HomeWidget(),
          ),
          GoRoute(
            path: "/new",
            name: 'new',
            builder: (context, _) => const NewPage(),
            routes: const [],
          ),
          GoRoute(
            path: "/new1",
            name: 'new1',
            builder: (context, _) => const NewPage2(),
          ),
        ],
      ),
    ),
  );
}

class HomeWidget extends StatelessWidget {
  const HomeWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(),
      body: Center(
        child: TextButton(
          child: const Text('Go to Page'),
          onPressed: () {
            context.pushNamed('new');
          },
        ),
      ),
    );
  }
}
