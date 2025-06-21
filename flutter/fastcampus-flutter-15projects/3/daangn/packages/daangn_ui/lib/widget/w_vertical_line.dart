import 'package:daangn_ui/common/dart/extension/context_extension.dart';
import 'package:flutter/material.dart';

class VerticalLine extends StatelessWidget {
  const VerticalLine({
    super.key,
    this.color,
    this.width = 1,
    this.margin,
  });

  final Color? color;
  final EdgeInsets? margin;
  final double width;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: margin,
      color: color ?? context.appColors.divider,
      width: width,
    );
  }
}
