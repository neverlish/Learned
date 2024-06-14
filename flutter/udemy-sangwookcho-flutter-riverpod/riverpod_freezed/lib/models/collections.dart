import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'collections.freezed.dart';

@freezed
class ImmutableColl with _$ImmutableColl {
  factory ImmutableColl(
    List<int> list,
  ) = _ImmutableColl;
}

@Freezed(makeCollectionsUnmodifiable: false)
class MutableColl with _$MutableColl {
  factory MutableColl(
    List<int> list,
  ) = _MutableColl;
}
