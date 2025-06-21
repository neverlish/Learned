import 'package:flutter/material.dart';

class RoundedContainer extends StatelessWidget {
  final Widget? child;
  final double radius;
  final Color? color;
  final EdgeInsets? margin;
  final EdgeInsets? padding;

  const RoundedContainer({
    super.key,
    this.child,
    this.margin,
    this.padding,
    this.radius = 10,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      padding: padding,
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(radius),
      ),
      child: child,
    );
  }
}
