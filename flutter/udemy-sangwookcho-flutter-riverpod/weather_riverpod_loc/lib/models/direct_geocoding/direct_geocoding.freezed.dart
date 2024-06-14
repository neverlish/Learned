// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'direct_geocoding.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

DirectGeocoding _$DirectGeocodingFromJson(Map<String, dynamic> json) {
  return _DirectGeocoding.fromJson(json);
}

/// @nodoc
mixin _$DirectGeocoding {
  String get name => throw _privateConstructorUsedError;
  double get lat => throw _privateConstructorUsedError;
  double get lon => throw _privateConstructorUsedError;
  String get country => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $DirectGeocodingCopyWith<DirectGeocoding> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $DirectGeocodingCopyWith<$Res> {
  factory $DirectGeocodingCopyWith(
          DirectGeocoding value, $Res Function(DirectGeocoding) then) =
      _$DirectGeocodingCopyWithImpl<$Res, DirectGeocoding>;
  @useResult
  $Res call({String name, double lat, double lon, String country});
}

/// @nodoc
class _$DirectGeocodingCopyWithImpl<$Res, $Val extends DirectGeocoding>
    implements $DirectGeocodingCopyWith<$Res> {
  _$DirectGeocodingCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? lat = null,
    Object? lon = null,
    Object? country = null,
  }) {
    return _then(_value.copyWith(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      lat: null == lat
          ? _value.lat
          : lat // ignore: cast_nullable_to_non_nullable
              as double,
      lon: null == lon
          ? _value.lon
          : lon // ignore: cast_nullable_to_non_nullable
              as double,
      country: null == country
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$DirectGeocodingImplCopyWith<$Res>
    implements $DirectGeocodingCopyWith<$Res> {
  factory _$$DirectGeocodingImplCopyWith(_$DirectGeocodingImpl value,
          $Res Function(_$DirectGeocodingImpl) then) =
      __$$DirectGeocodingImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String name, double lat, double lon, String country});
}

/// @nodoc
class __$$DirectGeocodingImplCopyWithImpl<$Res>
    extends _$DirectGeocodingCopyWithImpl<$Res, _$DirectGeocodingImpl>
    implements _$$DirectGeocodingImplCopyWith<$Res> {
  __$$DirectGeocodingImplCopyWithImpl(
      _$DirectGeocodingImpl _value, $Res Function(_$DirectGeocodingImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? name = null,
    Object? lat = null,
    Object? lon = null,
    Object? country = null,
  }) {
    return _then(_$DirectGeocodingImpl(
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      lat: null == lat
          ? _value.lat
          : lat // ignore: cast_nullable_to_non_nullable
              as double,
      lon: null == lon
          ? _value.lon
          : lon // ignore: cast_nullable_to_non_nullable
              as double,
      country: null == country
          ? _value.country
          : country // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$DirectGeocodingImpl implements _DirectGeocoding {
  _$DirectGeocodingImpl(
      {this.name = '', this.lat = 0.0, this.lon = 0.0, this.country = ''});

  factory _$DirectGeocodingImpl.fromJson(Map<String, dynamic> json) =>
      _$$DirectGeocodingImplFromJson(json);

  @override
  @JsonKey()
  final String name;
  @override
  @JsonKey()
  final double lat;
  @override
  @JsonKey()
  final double lon;
  @override
  @JsonKey()
  final String country;

  @override
  String toString() {
    return 'DirectGeocoding(name: $name, lat: $lat, lon: $lon, country: $country)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$DirectGeocodingImpl &&
            (identical(other.name, name) || other.name == name) &&
            (identical(other.lat, lat) || other.lat == lat) &&
            (identical(other.lon, lon) || other.lon == lon) &&
            (identical(other.country, country) || other.country == country));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, name, lat, lon, country);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$DirectGeocodingImplCopyWith<_$DirectGeocodingImpl> get copyWith =>
      __$$DirectGeocodingImplCopyWithImpl<_$DirectGeocodingImpl>(
          this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$DirectGeocodingImplToJson(
      this,
    );
  }
}

abstract class _DirectGeocoding implements DirectGeocoding {
  factory _DirectGeocoding(
      {final String name,
      final double lat,
      final double lon,
      final String country}) = _$DirectGeocodingImpl;

  factory _DirectGeocoding.fromJson(Map<String, dynamic> json) =
      _$DirectGeocodingImpl.fromJson;

  @override
  String get name;
  @override
  double get lat;
  @override
  double get lon;
  @override
  String get country;
  @override
  @JsonKey(ignore: true)
  _$$DirectGeocodingImplCopyWith<_$DirectGeocodingImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
