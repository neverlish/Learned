import 'package:flutter/material.dart';
import 'package:go_riverpod/config/router/route_names.dart';
import 'package:go_router/go_router.dart';

class PageNotFound extends StatelessWidget {
  final String errMsg;
  const PageNotFound({
    super.key,
    required this.errMsg,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Error Route'),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 30.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                errMsg,
                style: const TextStyle(
                  color: Colors.red,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              OutlinedButton(
                onPressed: () {
                  GoRouter.of(context).goNamed(RouteNames.first);
                },
                child: const Text('Go to First'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
