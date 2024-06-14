import 'package:flutter/material.dart';

import '../models/person.dart';

class PersonPage extends StatelessWidget {
  const PersonPage({super.key});

  Person generatePerson({
    required int id,
    required String name,
    required String email,
  }) {
    return Person(id: id, name: name, email: email);
  }

  @override
  Widget build(BuildContext context) {
    final person1 =
        generatePerson(id: 1, name: 'john', email: 'john@gmail.com');
    final person2 = person1.copyWith(id: 2, email: 'johndoe@gmail.com');
    final person3 =
        generatePerson(id: 1, name: 'john', email: 'john@gmail.com');
    print(person1);
    print(person2);
    print(person1 == person3);
    print(person1.hashCode);
    print(person3.hashCode);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Person'),
      ),
    );
  }
}
