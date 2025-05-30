abstract interface class Food<T extends Flavor> {
  T createFlavor();
}

class Chocolate extends Food {
  @override
  Flavor createFlavor() {
    return Sweet();
  }
}

class LemonCandy extends Food {
  @override
  Flavor createFlavor() {
    return Sour();
  }
}

class SpicyRamen extends Food {
  @override
  Flavor createFlavor() {
    return Spicy();
  }
}

abstract interface class Flavor {
  String get taste;
}

class Sour extends Flavor {
  @override
  String get taste => "sour";
}

class Sweet extends Flavor {
  @override
  String get taste => "sweet";
}

class Spicy extends Flavor {
  @override
  String get taste => "spicy";
}

abstract interface class FoodFactory<T extends Food> {
  T createFood();
}

class ChocolateFactory implements FoodFactory<Chocolate> {
  @override
  Chocolate createFood() {
    return Chocolate();
  }
}

main() {
  final FoodFactory factory = getFactory();
  final Food food = factory.createFood();
  print(food.createFlavor().taste);
}

FoodFactory getFactory() => ChocolateFactory();
