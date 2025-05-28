import 'package:fast_app_base/common/common.dart';
import 'package:flutter/material.dart';

class ImageButton extends StatelessWidget {
  final VoidCallback onTap;
  final double width;
  final double height;
  final EdgeInsets padding;
  final String imagePath;

  const ImageButton({
    super.key,
    required this.onTap,
    this.width = 26,
    this.height = 26,
    this.padding = const EdgeInsets.all(10),
    required this.imagePath,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: padding,
      child: Tap(
        onTap: onTap,
        child: Image.asset(imagePath, height: height, width: width),
      ),
    );
  }
}
