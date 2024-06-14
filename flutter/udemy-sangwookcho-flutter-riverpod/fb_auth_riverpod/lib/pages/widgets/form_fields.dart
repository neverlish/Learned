import 'package:flutter/material.dart';
import 'package:validators/validators.dart';

class ConfirmPasswordFormField extends StatelessWidget {
  const ConfirmPasswordFormField({
    super.key,
    required TextEditingController passwordController,
    required this.labelText,
  }) : _passwordController = passwordController;

  final TextEditingController _passwordController;
  final String labelText;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      obscureText: true,
      decoration: const InputDecoration(
        border: OutlineInputBorder(),
        filled: true,
        labelText: 'Confirm password',
        prefixIcon: Icon(Icons.lock),
      ),
      validator: (String? value) {
        if (_passwordController.text != value) {
          return 'Passwords not match';
        }
        return null;
      },
    );
  }
}

class PasswordFormField extends StatelessWidget {
  const PasswordFormField({
    super.key,
    required TextEditingController passwordController,
    required this.labelText,
  }) : _passwordController = passwordController;

  final TextEditingController _passwordController;
  final String labelText;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
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
          return 'Password must be at least 6 characters';
        }
        return null;
      },
    );
  }
}

class EmailFormField extends StatelessWidget {
  const EmailFormField({
    super.key,
    required TextEditingController emailController,
  }) : _emailController = emailController;

  final TextEditingController _emailController;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: _emailController,
      keyboardType: TextInputType.emailAddress,
      autocorrect: false,
      decoration: const InputDecoration(
        border: OutlineInputBorder(),
        filled: true,
        labelText: 'Email',
        hintText: 'your@email.com',
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
    );
  }
}

class NameFormField extends StatelessWidget {
  const NameFormField({
    super.key,
    required TextEditingController nameController,
  }) : _nameController = nameController;

  final TextEditingController _nameController;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      controller: _nameController,
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
        if (value.trim().length < 2 || value.trim().length > 12) {
          return 'Name must be between 2 and 12 characters long';
        }
        return null;
      },
    );
  }
}
