import 'package:meta/meta.dart';

class Rectangular {
  double height;
  double width;

  Rectangular(this.width, this.height);

  @nonVirtual
  double getArea() {
    return height * width;
  }
}

class Square extends Rectangular {
  Square(double side) : super(side, side);

  @override
  set height(double height) {
    super.height = height;
    super.width = height;
  }

  @override
  set width(double width) {
    super.width = width;
    super.height = width;
  }

  @override
  double getArea() {
    return super.getArea();
  }
}

main() {
  Rectangular rectangular = getRectangular();
  rectangular.height = 40;

  print(rectangular.width);
}

Rectangular getRectangular() => Square(10);
