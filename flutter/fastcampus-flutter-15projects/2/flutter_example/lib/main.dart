import 'package:flutter/material.dart';

const assetImagePath = 'assets/images/';
const bannerImage = '$assetImagePath/banner.png';

void main() {
  runApp(
    const MaterialApp(
      home: Scaffold(
        body: Body(),
      ),
    ),
  );
}

class Body extends StatelessWidget {
  const Body({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Image.asset(bannerImage),
    );
  }
}
