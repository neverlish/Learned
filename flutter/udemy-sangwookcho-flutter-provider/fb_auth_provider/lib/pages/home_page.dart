import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'profile_page.dart';
import '../providers/auth/auth_provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  static const routeName = '/home';

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async => false,
      child: Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          title: const Text('Home'),
          actions: [
            IconButton(
              onPressed: () {
                context.read<AuthProvider>().signout();
              },
              icon: const Icon(Icons.exit_to_app),
            ),
            IconButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) {
                    return const ProfilePage();
                  }),
                );
              },
              icon: const Icon(Icons.account_circle),
            ),
          ],
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Image.asset(
                    'assets/images/flutter_favorite.png',
                    width: 100,
                  ),
                  const SizedBox(width: 20.0),
                  const Text(
                    'Provider',
                    style: TextStyle(fontSize: 42.0),
                  ),
                ],
              ),
              const SizedBox(height: 20.0),
              const Text(
                'Provider is an awesome\nstate management library\nfor flutter!',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24.0),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
