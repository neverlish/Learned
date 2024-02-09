import 'package:flutter/material.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacementNamed(context, '/main');
    });
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              'assets/business_card.png',
              width: 180,
              height: 180,
            ),
            Container(
              margin: const EdgeInsets.only(top: 32),
              child: const Text(
                'Business Card',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                  color: Colors.black,
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
