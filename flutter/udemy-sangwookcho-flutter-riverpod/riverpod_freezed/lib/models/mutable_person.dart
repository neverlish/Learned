import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'mutable_person.freezed.dart';

@unfreezed
class MutablePerson with _$MutablePerson {
  factory MutablePerson({
    required final int id,
    required String name,
    required String email,
  }) = _MutablePerson;
}
