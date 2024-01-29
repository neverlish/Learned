import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:validators/validators.dart';

import '../models/custom_error.dart';
import '../providers/signup/signup_provider.dart';
import '../providers/signup/signup_state.dart';
import '../utils/error_dialog.dart';

class SignupPage extends StatefulWidget {
  const SignupPage({super.key});
  static const String routeName = '/signup';

  @override
  _SignupPageState createState() => _SignupPageState();
}

class _SignupPageState extends State<SignupPage> {
  final _formKey = GlobalKey<FormState>();
  AutovalidateMode _autovalidateMode = AutovalidateMode.disabled;
  String? _name, _email, _password;
  final _passwordController = TextEditingController();

  void _submit() async {
    setState(() {
      _autovalidateMode = AutovalidateMode.always;
    });

    final form = _formKey.currentState;

    if (form == null || !form.validate()) return;

    form.save();

    print('name: $_name, email: $_email, password: $_password');

    try {
      await context
          .read<SignupProvider>()
          .signup(name: _name!, email: _email!, password: _password!);
    } on CustomError catch (e) {
      errorDialog(context, e);
    }
  }

  @override
  Widget build(BuildContext context) {
    final signupState = context.watch<SignupProvider>().state;

    return GestureDetector(
      onTap: () => FocusScope.of(context).unfocus(),
      child: Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 30.0),
            child: Form(
              key: _formKey,
              autovalidateMode: _autovalidateMode,
              child: ListView(
                reverse: true,
                shrinkWrap: true,
                children: [
                  Image.asset(
                    'assets/images/flutter_logo.png',
                    width: 250,
                    height: 250,
                  ),
                  const SizedBox(height: 20.0),
                  TextFormField(
                    autocorrect: false,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      filled: true,
                      labelText: 'Name',
                      prefixIcon: Icon(Icons.account_box),
                    ),
                    validator: (String? value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Name required';
                      }
                      if (value.trim().length < 2) {
                        return 'Name must be at least 2 characters long';
                      }
                      return null;
                    },
                    onSaved: (String? value) {
                      _name = value;
                    },
                  ),
                  const SizedBox(height: 20.0),
                  TextFormField(
                    keyboardType: TextInputType.emailAddress,
                    autocorrect: false,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      filled: true,
                      labelText: 'Email',
                      prefixIcon: Icon(Icons.email),
                    ),
                    validator: (String? value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Email required';
                      }
                      if (!isEmail(value.trim())) {
                        return 'Enter a valid email';
                      }
                      return null;
                    },
                    onSaved: (String? value) {
                      _email = value;
                    },
                  ),
                  const SizedBox(height: 20.0),
                  TextFormField(
                    controller: _passwordController,
                    obscureText: true,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      filled: true,
                      labelText: 'Password',
                      prefixIcon: Icon(Icons.lock),
                    ),
                    validator: (String? value) {
                      if (value == null || value.trim().isEmpty) {
                        return 'Password required';
                      }
                      if (value.trim().length < 6) {
                        return 'Password must be at least 6 characters long';
                      }
                      return null;
                    },
                    onSaved: (String? value) {
                      _password = value;
                    },
                  ),
                  const SizedBox(height: 20.0),
                  TextFormField(
                    obscureText: true,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      filled: true,
                      labelText: 'Confirm Password',
                      prefixIcon: Icon(Icons.lock),
                    ),
                    validator: (String? value) {
                      if (_passwordController.text != value) {
                        return 'Passwords not match';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 20.0),
                  ElevatedButton(
                    onPressed:
                        signupState.signupStatus == SignupStatus.submitting
                            ? null
                            : _submit,
                    style: ElevatedButton.styleFrom(
                      textStyle: const TextStyle(
                        fontSize: 20.0,
                        fontWeight: FontWeight.w600,
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                    ),
                    child: Text(
                        signupState.signupStatus == SignupStatus.submitting
                            ? 'Loading...'
                            : 'Sign Up'),
                  ),
                  const SizedBox(height: 10.0),
                  TextButton(
                    onPressed:
                        signupState.signupStatus == SignupStatus.submitting
                            ? null
                            : () {
                                Navigator.pop(context);
                              },
                    style: TextButton.styleFrom(
                      textStyle: const TextStyle(
                        fontSize: 20.0,
                        decoration: TextDecoration.underline,
                      ),
                    ),
                    child: const Text('Already a member? Sign in!'),
                  ),
                ].reversed.toList(),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
