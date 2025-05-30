import 'package:fast_app_base/class/object_oriented_programming/1_characteristic/animal.dart';

main() {
  /// 객체지향 프로그래밍(OOP)의 특징

  /// 1. 추상화 (Abstraction)
  ///  - Abstract Class (extends - only 1)
  ///   - Animal - age, eat()
  ///   - Dog, Cat
  ///
  ///  - Abstract mixin Class (with - n*)
  ///
  ///
  ///  - Abstract interface Class (implements - n*)
  ///
  ///

  // final bird = Bird(0);
  // bird.fly();
  // bird.run();

  /// 2. 상속 (Inheritance)
  ///  - Extends

  /// 3. 다형성 (Polymorphism)
  ///  - override
  ///  - implement

  final bird = Bird(0, "long 2 legs");
  final dog = Dog(0, "long");
  dog.addAge();
  CanRun runner1 = bird;
  runRace(<CanRun>[dog, bird]);

  /// 4. 캡슐화 (Encapsulation)
  ///  - private ( _ 언더스코어, 언더바)
  ///  - method
  ///  - get & set
}

void runRace(List<CanRun> list) {
  for (final runner in list) {
    runner.run("첫번째 경기");
    if (runner is Dog) {
      runner.addAge();
    }
    //print(runner);
  }
}
