import 'package:equatable/equatable.dart';

class Person extends Equatable {
  final Stream name;
  final int age;

  Person({
    required this.name,
    required this.age,
  });

  @override
  List<Object?> get props => [name, age];

  @override
  bool get stringify => true;
}
