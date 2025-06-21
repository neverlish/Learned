import 'package:flutter/material.dart';

class AnimatedNumberText extends StatefulWidget {
  final TextStyle? textStyle;
  final Duration duration;
  final String value;
  final bool animateSameValue;

  const AnimatedNumberText(this.value,
      {super.key,
      this.textStyle,
      this.duration = const Duration(milliseconds: 400),
      this.animateSameValue = true});

  @override
  AnimatedNumberTextState createState() => AnimatedNumberTextState();
}

class AnimatedNumberTextState extends State<AnimatedNumberText> {
  String value = "";

  List<Widget> items = [];
  List<String> digits = [];

  @override
  Widget build(BuildContext context) {
    bool isNewValue = value != widget.value;
    if (isNewValue) {
      value = widget.value;
      items = [];
      for (int i = 0; i < value.runes.length; ++i) {
        String char = String.fromCharCode(value.runes.elementAt(i));
        items.add(_DigitWidget(char,
            delayTime: widget.duration.inMilliseconds * i,
            textStyle: widget.textStyle));
      }
    }

    return Directionality(
      textDirection: TextDirection.ltr,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: items,
      ),
    );
  }
}

class _DigitWidget extends StatefulWidget {
  final String value;
  final TextStyle? textStyle;
  final int delayTime;
  final bool animateSameValue;

  const _DigitWidget(
    this.value, {
    super.key,
    this.delayTime = 0,
    this.textStyle,
    this.animateSameValue = true,
  });

  @override
  _DigitWidgetState createState() => _DigitWidgetState();
}

class _DigitWidgetState extends State<_DigitWidget>
    with TickerProviderStateMixin {
  String oldValue = ' ';
  TextStyle? textStyle;
  Size digitSize = const Size(0, 0);

  late final Animation<double> animation;
  late final AnimationController controller;

  List<String> futureTasks = [];

  @override
  void initState() {
    // print('*****   Digit Widget  initState  *****');
    textStyle = widget.textStyle;
    digitSize = getSingleDigitSize(widget.value);
    initAnimation();
    super.initState();
  }

  @override
  void didUpdateWidget(covariant _DigitWidget oldWidget) {
    digitSize = getSingleDigitSize(widget.value);
    // print('digit rebuild: ${widget.value}');
    if (widget.animateSameValue) animate();
    super.didUpdateWidget(oldWidget);
  }

  initAnimation() {
    controller = AnimationController(
        duration: const Duration(milliseconds: 300), vsync: this);
    final Animation<double> curve =
        CurvedAnimation(parent: controller, curve: Curves.fastOutSlowIn);
    animation =
        Tween(begin: 0.0, end: digitSize.height.toDouble()).animate(curve)
          ..addListener(() {
            setState(() {});
          });

    animation.addStatusListener((status) {
      if (controller.status == AnimationStatus.completed) {
        oldValue = widget.value;
        controller.reset();
      }
    });

    animate();
  }

  isAVisible() => animation.value == 0;

  animate() async {
    Future.delayed(Duration(milliseconds: widget.delayTime), () {
      if (mounted) {
        controller.forward();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // print('*****   Digit Widget  build, value is: ${widget.value}, Old value = $oldValue, New value=${widget.value}  *****');

    String a = oldValue;
    String b = widget.value;

    // animate();

    return SizedOverflowBox(
      size: digitSize,
      alignment: Alignment.topCenter,
      child: ClipRect(
        clipper: DigitClipper(digitSize),
        child: Transform.translate(
          offset: Offset(0, -1 * animation.value),
          child: Column(
            children: [
              Text(a, style: textStyle),
              Text(b, style: textStyle),
            ],
          ),
        ),
      ),
    );
  }

  getSingleDigitSize(String char) {
    final painter = TextPainter();
    painter.text = TextSpan(style: textStyle, text: char);
    painter.textDirection = TextDirection.ltr;
    painter.textAlign = TextAlign.left;
    painter.textScaleFactor = 1.0;
    painter.layout();
    return painter.size;
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}

class DigitClipper extends CustomClipper<Rect> {
  final Size digitSize;

  DigitClipper(this.digitSize);

  @override
  Rect getClip(Size size) =>
      Rect.fromPoints(Offset.zero, Offset(digitSize.width, digitSize.height));

  @override
  bool shouldReclip(covariant CustomClipper<Rect> oldClipper) => false;
}
