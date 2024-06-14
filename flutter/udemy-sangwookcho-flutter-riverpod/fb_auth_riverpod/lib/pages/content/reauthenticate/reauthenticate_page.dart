import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../models/custom_error.dart';
import '../../../repositories/auth_repository_provider.dart';
import '../../../utils/error_dialog.dart';
import '../../widgets/form_fields.dart';

class ReauthenticatePage extends ConsumerStatefulWidget {
  const ReauthenticatePage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() =>
      _ReauthenticatePageState();
}

class _ReauthenticatePageState extends ConsumerState<ReauthenticatePage> {
  final _formKey = GlobalKey<FormState>();
  AutovalidateMode _autovalidateMode = AutovalidateMode.disabled;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool submitting = false;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  void _submit() async {
    setState(() {
      _autovalidateMode = AutovalidateMode.always;
    });

    final form = _formKey.currentState;

    if (form == null || !form.validate()) return;

    setState(() {
      submitting = true;
    });

    try {
      final navigator = Navigator.of(context);

      await ref.read(authRepositoryProvider).reauthenticateWithCredential(
            _emailController.text.trim(),
            _passwordController.text.trim(),
          );

      setState(() {
        submitting = false;
      });

      navigator.pop('success');
    } on CustomError catch (e) {
      setState(() {
        submitting = false;
      });
      if (!mounted) return;
      errorDialog(context, e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Reauthenticate'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 30),
          child: Form(
            key: _formKey,
            autovalidateMode: _autovalidateMode,
            child: ListView(
              shrinkWrap: true,
              reverse: true,
              children: [
                const Text(
                  'This is a security-sesitive operation\nyou must have recently signed-in!',
                  style: TextStyle(
                    color: Colors.red,
                    fontWeight: FontWeight.bold,
                    fontSize: 18.0,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 40.0),
                EmailFormField(emailController: _emailController),
                const SizedBox(height: 20.0),
                PasswordFormField(
                  passwordController: _passwordController,
                  labelText: 'Password',
                ),
                const SizedBox(height: 20.0),
                ElevatedButton(
                  onPressed: submitting ? null : _submit,
                  style: ElevatedButton.styleFrom(
                    textStyle: const TextStyle(
                      fontSize: 20.0,
                      fontWeight: FontWeight.w600,
                    ),
                    padding: const EdgeInsets.symmetric(
                      vertical: 10.0,
                    ),
                  ),
                  child: Text(
                    submitting ? 'Submitting...' : 'Reauthenticate',
                  ),
                ),
              ].reversed.toList(),
            ),
          ),
        ),
      ),
    );
  }
}
