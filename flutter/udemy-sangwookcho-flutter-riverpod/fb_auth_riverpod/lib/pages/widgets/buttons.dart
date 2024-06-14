import 'package:flutter/material.dart';

class CustomFilledButton extends StatelessWidget {
  final void Function()? onPressed;
  final double fontSize;
  final FontWeight fontWeight;
  final Widget child;
  const CustomFilledButton({
    super.key,
    required this.onPressed,
    required this.fontSize,
    this.fontWeight = FontWeight.normal,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return FilledButton(
      onPressed: onPressed,
      style: FilledButton.styleFrom(
        textStyle: TextStyle(
          fontSize: fontSize,
          fontWeight: fontWeight,
        ),
        padding: const EdgeInsets.symmetric(
          vertical: 10.0,
        ),
      ),
      child: child,
    );
  }
}

class CustomTextButton extends StatelessWidget {
  final void Function()? onPressed;
  final Color? foregroundColor;
  final double fontSize;
  final FontWeight fontWeight;
  final Widget child;
  const CustomTextButton({
    super.key,
    required this.onPressed,
    this.foregroundColor,
    required this.fontSize,
    required this.fontWeight,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return TextButton(
      onPressed: onPressed,
      style: TextButton.styleFrom(
        foregroundColor: foregroundColor,
        textStyle: TextStyle(
          fontSize: fontSize,
          fontWeight: fontWeight,
        ),
        minimumSize: Size.zero,
        padding: EdgeInsets.zero,
      ),
      child: child,
    );
  }
}
