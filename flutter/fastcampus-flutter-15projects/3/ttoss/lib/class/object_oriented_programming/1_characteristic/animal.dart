abstract class Animal {
  Animal(this._age);

  int _age;

  int get age => _age;

  void addAge() {
    _age++;
  }

  void eat() {}
}

abstract mixin class CanFly {
  String wings = "wings";

  void fly() {
    print('훨훨');
  }
}

abstract mixin class CanFlyUpgrade implements CanFly {
  @override
  String wings = "wings";

  @override
  void fly() {
    print('훨훨');
  }
}

abstract interface class CanRun {
  String get legs;

  set legs(String value);

  int run(String raceName);
}

abstract interface class CanRunUpgrade extends CanRun {
  void run3();
}

class Dog extends Animal implements CanRun {
  Dog(super.age, this.legs);

  @override
  void eat() {
    print('촵촵');
  }

  @override
  String legs;

  @override
  int run(String name) {
    print('$name 후다다다닥');
    return 5;
  }
}

class Bird extends Animal with CanFly implements CanRunUpgrade {
  Bird(super.age, this.legs);

  @override
  void eat() {
    print('콕콕');
  }

  @override
  String legs;

  @override
  int run(String ranceName) {
    print('$ranceName 닥닥');
    return 2;
  }

  @override
  void run3() {
    // TODO: implement run3
  }
}
