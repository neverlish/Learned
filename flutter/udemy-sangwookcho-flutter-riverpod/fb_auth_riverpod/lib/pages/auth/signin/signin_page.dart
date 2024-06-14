import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SigninPage extends ConsumerStatefulWidget {
  const SigninPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _SigninPageState();
}

class _SigninPageState extends ConsumerState<SigninPage> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: Text('Sign In'),
      ),
    );
  }
}
