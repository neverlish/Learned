import 'package:freezed_annotation/freezed_annotation.dart';

part 'direct_geocoding.freezed.dart';
part 'direct_geocoding.g.dart';

@freezed
class DirectGeocoding with _$DirectGeocoding {
  factory DirectGeocoding({
    @Default('') String name,
    @Default(0.0) double lat,
    @Default(0.0) double lon,
    @Default('') String country,
  }) = _DirectGeocoding;

  factory DirectGeocoding.fromJson(Map<String, dynamic> json) =>
      _$DirectGeocodingFromJson(json);
}
