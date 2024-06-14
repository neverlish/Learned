import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'method.freezed.dart';

@freezed
class Method with _$Method {
  const Method._();

  const factory Method(
    String methodName, {
    double? version,
  }) = _Method;

  void printMethod() {
    print('$methodName: ${version ?? 0.0}');
  }
}
