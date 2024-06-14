import 'package:flutter/material.dart';

import '../models/mutable_person.dart';

class MutablePersonPage extends StatelessWidget {
  const MutablePersonPage({super.key});

  @override
  Widget build(BuildContext context) {
    final person1 = MutablePerson(id: 1, name: 'jon', email: 'jon@gmail.com');
    // person1.id = 2;
    person1.name = 'john';
    person1.email = 'john@gmail.com';
    print(person1);
    final person2 = MutablePerson(id: 1, name: 'john', email: 'john@gmail.com');
    print(person1 == person2);
    final person3 = person1.copyWith(name: 'jane');
    print(person3);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mutable Person'),
      ),
    );
  }
}
