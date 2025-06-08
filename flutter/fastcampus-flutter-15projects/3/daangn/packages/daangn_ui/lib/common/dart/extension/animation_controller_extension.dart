import 'package:daangn_ui/common/dart/extension/num_duration_extension.dart';
import 'package:flutter/widgets.dart';

extension AnimationControllerExtension on AnimationController {
  void animateToTheEnd() {
    animateTo(1.0, duration: 0.ms);
  }

  void animateToTheBeginning() {
    animateTo(0, duration: 0.ms);
  }
}
