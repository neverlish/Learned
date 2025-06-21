import 'package:flutter/material.dart';

main() {
  final textWidget = TextWidgetBuilder('연습').setFontSize(14).setColor(Colors.blue).make();
}

class TextWidgetBuilder {
  double fontSize = 14;
  Color? color;
  String text;

  TextWidgetBuilder(this.text);

  TextWidgetBuilder setFontSize(double value) {
    fontSize = value;
    return this;
  }

  TextWidgetBuilder setColor(Color value) {
    color = value;
    return this;
  }

  Text make() {
    return Text(
      text,
      style: TextStyle(fontSize: fontSize, color: color),
    );
  }
}
