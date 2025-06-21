import 'dart:isolate';

class SingletonObject {
  int count = 0;

  SingletonObject._();

  static final SingletonObject instance = SingletonObject._();

  factory SingletonObject() {
    return instance;
  }
}

main() {
  // final object1 = SingletonObject();
  // object1.count = 100;
  // final object2 = SingletonObject();
  // final object3 = SingletonObject.instance;
  //
  // // print(object1 == object2);
  // // print(object2 == object3);
  // // print(object1 == object3);
  // print(object3.count);

  SingletonObject objectFromAnotherWorld = SingletonObject.instance;
  Isolate.run(() {
    final isolateObject = SingletonObject();
    final isolateObject2 = SingletonObject();
    print(isolateObject == isolateObject2);
    print(isolateObject == objectFromAnotherWorld);
  });
}
