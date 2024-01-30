import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class SigninPage extends StatelessWidget {
  const SigninPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sign In'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () async {
            UserCredential userCredential =
                await FirebaseAuth.instance.signInAnonymously();
            print('${userCredential.user}');
          },
          child: const Text(
            'SIGN IN',
            style: TextStyle(fontSize: 20.0),
          ),
        ),
      ),
    );
  }
}
