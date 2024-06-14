import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../config/router/route_names.dart';
import '../../../constants/firebase_constants.dart';
import '../../../models/custom_error.dart';
import '../../../repositories/auth_repository_provider.dart';
import '../../../utils/error_dialog.dart';

class VerifyEmailPage extends ConsumerStatefulWidget {
  const VerifyEmailPage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _VerifyEmailPageState();
}

class _VerifyEmailPageState extends ConsumerState<VerifyEmailPage> {
  Timer? timer;

  @override
  void initState() {
    super.initState();
    sendEmailVerification();
    timer = Timer.periodic(const Duration(seconds: 5), (timer) {
      checkEmailVerified();
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  Future<void> sendEmailVerification() async {
    try {
      await ref.read(authRepositoryProvider).sendEmailVerification();
    } on CustomError catch (e) {
      if (!mounted) return;
      errorDialog(context, e);
    }
  }

  Future<void> checkEmailVerified() async {
    final goRouter = GoRouter.of(context);

    void errorDialogRef(CustomError e) {
      errorDialog(context, e);
    }

    try {
      await ref.read(authRepositoryProvider).reloadUser();

      if (fbAuth.currentUser!.emailVerified == true) {
        timer?.cancel();
        goRouter.goNamed(RouteNames.home);
      }
    } on CustomError catch (e) {
      errorDialogRef(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Email Verification'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  const Text('Verification email has been sent to'),
                  Text('${fbAuth.currentUser?.email}'),
                  const Text('If you cannot find verification email,'),
                  RichText(
                    text: TextSpan(
                      text: 'Please check ',
                      style: DefaultTextStyle.of(context)
                          .style
                          .copyWith(fontSize: 18),
                      children: const [
                        TextSpan(
                          text: 'SPAM',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.red,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        TextSpan(text: ' folder.'),
                      ],
                    ),
                  ),
                  const Text('or, your email is correct.'),
                ],
              ),
            ),
            OutlinedButton(
              onPressed: () async {
                try {
                  await ref.read(authRepositoryProvider).signout();
                  timer?.cancel();
                } on CustomError catch (e) {
                  if (!mounted) return;
                  errorDialog(context, e);
                }
              },
              child: const Text(
                'CANCEL',
                style: TextStyle(fontSize: 20.0),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
