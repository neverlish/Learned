import 'package:daangn_ui/common/dart/extension/context_extension.dart';
import 'package:flutter/material.dart';

class Line extends StatelessWidget {
  const Line({
    super.key,
    this.color,
    this.height = 1,
    this.margin,
  });

  final Color? color;
  final EdgeInsets? margin;
  final double height;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      color: color ?? context.appColors.divider,
      height: height,
    );
  }
}
