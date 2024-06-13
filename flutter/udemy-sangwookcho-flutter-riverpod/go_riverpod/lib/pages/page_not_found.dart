import 'package:flutter/material.dart';

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
                onPressed: () {},
                child: const Text('Go to First'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
