import 'package:fast_app_base/common/common.dart';
import 'package:flutter/material.dart';
import 'package:rive/rive.dart';

class TextWatchingBearController {
  late void Function() runSuccessAnimation;
  late void Function() runFailAnimation;
}

class TextWatchingBear extends StatefulWidget {
  final bool check;
  final bool handsUp;
  final double look;
  final TextWatchingBearController controller;

  const TextWatchingBear({
    super.key,
    required this.check,
    required this.handsUp,
    required this.look,
    required this.controller,
  });

  @override
  State<TextWatchingBear> createState() => _TextWatchingBearState();
}

class _TextWatchingBearState extends State<TextWatchingBear> {
  late StateMachineController controller;
  late SMIBool smiCheck;
  late SMIBool smiHandsUp;
  late SMINumber smiLook;
  late SMITrigger smiSuccess;
  late SMITrigger smiFail;

  @override
  void initState() {
    widget.controller.runSuccessAnimation = () {
      smiSuccess.fire();
    };
    widget.controller.runFailAnimation = () {
      smiFail.fire();
    };
    super.initState();
  }

  @override
  void didUpdateWidget(covariant TextWatchingBear oldWidget) {
    if (oldWidget.check != widget.check) {
      smiCheck.value = widget.check;
    }
    if (oldWidget.handsUp != widget.handsUp) {
      smiHandsUp.value = widget.handsUp;
    }
    if (oldWidget.look != widget.look) {
      smiLook.value = widget.look;
    }
    super.didUpdateWidget(oldWidget);
  }

  @override
  Widget build(BuildContext context) {
    return RiveAnimation.asset(
      "$baseRivePath/login_screen_character.riv",
      stateMachines: const ["State Machine 1"],
      onInit: (Artboard art) {
        controller =
            StateMachineController.fromArtboard(art, "State Machine 1")!;
        controller.isActive = true;

        art.addController(controller);
        smiCheck = controller.findInput<bool>('Check') as SMIBool;
        smiHandsUp = controller.findInput<bool>('hands_up') as SMIBool;
        smiLook = controller.findInput<double>('Look') as SMINumber;
        smiSuccess = controller.findInput<bool>('success') as SMITrigger;
        smiFail = controller.findInput<bool>('fail') as SMITrigger;
      },
    );
  }
}
