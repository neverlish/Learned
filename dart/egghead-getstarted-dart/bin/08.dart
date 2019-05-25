// 08 Understand Classes and Inheritance in Dart

void main() {
  // Person johnny = Person('Johnny', 42, occupation: 'Pilot');
  // johnny.speak();
  // johnny.name = 'Big Johnny';
  // johnny.speak();

  Person johnny = Person('Johnny', 42, occupation: 'Pilot')
    ..speak()
    ..name = 'Big Johnny'
    ..speak();
  print(johnny.name);
  print(johnny.occupation);

  Person jane = Person.fromJson({'name': 'Jane', 'age': 39}, 'Web Developer');
  jane.speak();
  print(jane.occupation);

  print(johnny == jane);

  Person jane2 = Person('Jane', 39, occupation: 'Web Developer');
  print(jane == jane2);

  var bob = Employee('Bob', 23, DateTime.now());
  bob.speak();
  // bob.joinDate = DateTime.now(); // The setter 'joinDate' isn't defined for the class 'Employee'
}

class Employee extends Person {
  final DateTime joinDate;

  Employee(String name, int age, this.joinDate) : super(name, age);

  @override
  speak() {
    print('My name is $name. I joined on $joinDate');
  }
}

class Person {
  // var name;
  // var age;
  String _name;
  int age;
  String occupation;

  // Person(name, age) {
  //   this.name = name;
  //   this.age = age;
  // }
  Person(this._name, this.age, {this.occupation});
  Person.fromJson(Map json, [this.occupation]) {
    _name = json['name'];
    age = json['age'];
  }

  bool operator ==(dynamic b) =>
      _name == b.name && age == b.age && occupation == b.occupation;

  String get name => _name;
  void set name(String updatedName) => _name = updatedName;

  speak() {
    print("My name is $_name. I'm $age years old.");
  }

  void _hiddenMethod() {
    print('This method is hidden');
  }
}
