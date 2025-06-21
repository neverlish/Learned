// class Animal {
//   final add2 = (int a, int b) => a + b;
//   void eat() {}
// }

// class Animal {
//   int age;
//   final String name;

//   Animal(this.age, this.name);

//   void eat() {
//     age++;
//   }

//   // final eat2 = () => age++;

//   @override
//   String toString() {
//     return "Animal: $age, $name";
//   }
// }

import 'package:fast_app_base/common/dart/collection/sort_functions.dart';

class Animal {
  int age;
  final String name;

  Animal(this.age, this.name);

  @override
  String toString() {
    return "Animal: $age, $name";
  }
}

main() {
  // int add(int a, int b) {
  //   return a + b;
  // }

  // int add(int a, int b) => a + b;

  // // final add2 = (int a, int b) => a + b;
  // add2(int a, int b) => a + b;
  // run(add2, 1, 2);

  // final animal = Animal();
  // final addFunction = animal.add2;

  // final list = [5, 2, 4, 1, 3];

  // list.sort((a, b) => a == b
  //     ? 0
  //     : a < b
  //         ? 5
  //         : -4);

  // print(list);

  final list = [
    Animal(5, '강아지'),
    Animal(2, '치타'),
    Animal(4, '토끼'),
    Animal(1, '하마'),
    Animal(20, '펭귄'),
  ];

  // list.sort((a, b) => a.age == b.age
  //     ? 0
  //     : a.age < b.age
  //         ? 5
  //         : -4);

  // list.sort(byIntField<Animal>((animal) => animal.age, reverse: true));
  list.sort(byStringField<Animal>((element) => element.name, reverse: true));

  print(list);

  add(a) => (b) => a + b;

  final add2 = add(2);

  print(add2(3));
  print(add(2)(3));
}

void run(int Function(int a, int b) add2, int a, int b) {
  final sum = add2(a, b);
  print(sum);
}
