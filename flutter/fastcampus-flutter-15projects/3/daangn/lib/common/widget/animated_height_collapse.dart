import 'package:flutter/material.dart';

class AnimatedHeightCollapse extends StatelessWidget {
  final bool visible;
  final Widget child;
  final Duration duration;

  const AnimatedHeightCollapse({
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
                maxHeight: double.infinity,
              )
            : const BoxConstraints(
                maxHeight: 0.0,
              ),
        child: visible ? child : Container(),
      ),
    );
  }
}
