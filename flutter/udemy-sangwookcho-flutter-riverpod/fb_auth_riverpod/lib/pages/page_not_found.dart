import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../config/router/route_names.dart';

class PageNotFound extends StatelessWidget {
  final String errorMessage;
  const PageNotFound({
    Key? key,
    required this.errorMessage,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(30),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                errorMessage,
                style: const TextStyle(fontSize: 18, color: Colors.red),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 20),
              OutlinedButton(
                onPressed: () {
                  GoRouter.of(context).goNamed(RouteNames.home);
                },
                child: const Text(
                  'Home',
                  style: TextStyle(fontSize: 20),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
