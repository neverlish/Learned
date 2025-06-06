import 'package:flutter/material.dart';

class AnimatedWidthCollapse extends StatelessWidget {
  final bool visible;
  final Widget child;
  final Duration duration;

  const AnimatedWidthCollapse({
    super.key,
    required this.visible,
    required this.child,
    required this.duration,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedSize(
      duration: duration,
      child: Container(
        constraints: visible
            ? const BoxConstraints(
                maxWidth: double.infinity,
              )
            : const BoxConstraints(
                maxWidth: 0.0,
              ),
        child: visible ? child : Container(),
      ),
    );
  }
}
