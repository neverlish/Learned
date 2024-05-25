import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'person.freezed.dart';

@freezed
class Person with _$Person {
  const factory Person({
    required int id,
    required String name,
    required String email,
  }) = _Person;
}
