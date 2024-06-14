import 'package:flutter/material.dart';

class FirebaseErrorPage extends StatelessWidget {
  const FirebaseErrorPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text(
          'Firebase Connection Error\n\nTry later!',
          style: TextStyle(
            fontSize: 18.0,
            color: Colors.red,
          ),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
