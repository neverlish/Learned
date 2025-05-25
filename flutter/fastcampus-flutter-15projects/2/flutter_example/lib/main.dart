import 'package:flutter/material.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Study to Container"),
        ),
        body: const CustomContainer(),
      ),
    ),
  );
}

class CustomContainer extends StatelessWidget {
  const CustomContainer({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        width: 300,
        height: 300,
        // color: const Color(0xFF85D07B),
        padding: const EdgeInsets.fromLTRB(10, 12, 10, 12),
        decoration: BoxDecoration(
          color: const Color(0xFF85D07B),
          border: Border.all(
            color: Colors.red,
            style: BorderStyle.solid,
          ),
          borderRadius: BorderRadius.circular(100),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.3),
              offset: const Offset(6, 6),
              blurRadius: 10,
              spreadRadius: 10,
            ),
            BoxShadow(
              color: Colors.blue.withOpacity(0.3),
              offset: const Offset(-6, -6),
              blurRadius: 10,
              spreadRadius: 10,
            ),
          ],
        ),
        // margin: const EdgeInsets.symmetric(vertical: 24, horizontal: 10),
        child: Center(
          child: Container(
            color: Colors.yellow,
            child: const Text("Hello Container"),
          ),
        ),
      ),
    );
  }
}
