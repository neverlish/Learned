import 'package:flutter/material.dart';

class CustomButton extends StatelessWidget {
  final String title;
  final Widget child;
  const CustomButton({
    Key? key,
    required this.title,
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5.0),
      child: FilledButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(builder: (_) => child),
          );
        },
        child: Text(
          title,
          style: const TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
