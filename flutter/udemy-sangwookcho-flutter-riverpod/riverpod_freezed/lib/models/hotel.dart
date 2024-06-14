import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:flutter/foundation.dart';

part 'hotel.freezed.dart';
part 'hotel.g.dart';

@freezed
class Hotel with _$Hotel {
  @JsonSerializable(explicitToJson: true)
  const factory Hotel({
    required String name,
    required int classification,
    required String city,
    @JsonKey(name: 'parking_lot_capacity') int? parkingLotCapacity,
    @Default([]) List<Review> reviews,
  }) = _Hotel;

  factory Hotel.fromJson(Map<String, dynamic> json) => _$HotelFromJson(json);
}

@freezed
class Review with _$Review {
  const factory Review({
    required double score,
    String? review,
  }) = _Review;

  factory Review.fromJson(Map<String, dynamic> json) => _$ReviewFromJson(json);
}