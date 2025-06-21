abstract class Shape {
  double calculateArea();
}

class Rectangular extends Shape {
  double height;
  double width;

  Rectangular(this.width, this.height);

  @override
  double calculateArea() {
    return height * width;
  }
}

class Square extends Shape {
  double side;

  Square(this.side);

  @override
  double calculateArea() {
    return side * side;
  }
}

class Triangle extends Shape {
  double height;
  double width;

  Triangle(this.width, this.height);

  @override
  double calculateArea() {
    return height * width / 2;
  }
}

main() {
  /// OCP(The Open Closed Priciple): 개방 폐쇄 원칙
  ///
  /// Open for extension
  ///
  /// Closed for modification

  /// 1. Class를 추가할 때
  /// 2. Enum을 추가할 때

  final Fruit fruit = getFruit();
  String color = fruit.color;
  print(color);
}

getFruit() {
  return Fruit.Apple;
}

enum Fruit {
  Apple("red"),
  Banna("yellow"),
  Grape("purple");

  final String color;

  const Fruit(this.color);
}
