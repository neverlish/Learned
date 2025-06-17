// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'view_module.dto.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ViewModuleDto _$ViewModuleDtoFromJson(Map<String, dynamic> json) {
  return _ViewModuleDto.fromJson(json);
}

/// @nodoc
mixin _$ViewModuleDto {
  String? get type => throw _privateConstructorUsedError;
  String? get title => throw _privateConstructorUsedError;
  String? get subtitle => throw _privateConstructorUsedError;
  String? get imageUrl => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ViewModuleDtoCopyWith<ViewModuleDto> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ViewModuleDtoCopyWith<$Res> {
  factory $ViewModuleDtoCopyWith(
          ViewModuleDto value, $Res Function(ViewModuleDto) then) =
      _$ViewModuleDtoCopyWithImpl<$Res, ViewModuleDto>;
  @useResult
  $Res call({String? type, String? title, String? subtitle, String? imageUrl});
}

/// @nodoc
class _$ViewModuleDtoCopyWithImpl<$Res, $Val extends ViewModuleDto>
    implements $ViewModuleDtoCopyWith<$Res> {
  _$ViewModuleDtoCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = freezed,
    Object? title = freezed,
    Object? subtitle = freezed,
    Object? imageUrl = freezed,
  }) {
    return _then(_value.copyWith(
      type: freezed == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String?,
      title: freezed == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String?,
      subtitle: freezed == subtitle
          ? _value.subtitle
          : subtitle // ignore: cast_nullable_to_non_nullable
              as String?,
      imageUrl: freezed == imageUrl
          ? _value.imageUrl
          : imageUrl // ignore: cast_nullable_to_non_nullable
              as String?,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ViewModuleDtoImplCopyWith<$Res>
    implements $ViewModuleDtoCopyWith<$Res> {
  factory _$$ViewModuleDtoImplCopyWith(
          _$ViewModuleDtoImpl value, $Res Function(_$ViewModuleDtoImpl) then) =
      __$$ViewModuleDtoImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({String? type, String? title, String? subtitle, String? imageUrl});
}

/// @nodoc
class __$$ViewModuleDtoImplCopyWithImpl<$Res>
    extends _$ViewModuleDtoCopyWithImpl<$Res, _$ViewModuleDtoImpl>
    implements _$$ViewModuleDtoImplCopyWith<$Res> {
  __$$ViewModuleDtoImplCopyWithImpl(
      _$ViewModuleDtoImpl _value, $Res Function(_$ViewModuleDtoImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = freezed,
    Object? title = freezed,
    Object? subtitle = freezed,
    Object? imageUrl = freezed,
  }) {
    return _then(_$ViewModuleDtoImpl(
      type: freezed == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String?,
      title: freezed == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String?,
      subtitle: freezed == subtitle
          ? _value.subtitle
          : subtitle // ignore: cast_nullable_to_non_nullable
              as String?,
      imageUrl: freezed == imageUrl
          ? _value.imageUrl
          : imageUrl // ignore: cast_nullable_to_non_nullable
              as String?,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ViewModuleDtoImpl implements _ViewModuleDto {
  const _$ViewModuleDtoImpl(
      {this.type = '',
      this.title = '',
      this.subtitle = '',
      this.imageUrl = ''});

  factory _$ViewModuleDtoImpl.fromJson(Map<String, dynamic> json) =>
      _$$ViewModuleDtoImplFromJson(json);

  @override
  @JsonKey()
  final String? type;
  @override
  @JsonKey()
  final String? title;
  @override
  @JsonKey()
  final String? subtitle;
  @override
  @JsonKey()
  final String? imageUrl;

  @override
  String toString() {
    return 'ViewModuleDto(type: $type, title: $title, subtitle: $subtitle, imageUrl: $imageUrl)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ViewModuleDtoImpl &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.subtitle, subtitle) ||
                other.subtitle == subtitle) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(runtimeType, type, title, subtitle, imageUrl);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ViewModuleDtoImplCopyWith<_$ViewModuleDtoImpl> get copyWith =>
      __$$ViewModuleDtoImplCopyWithImpl<_$ViewModuleDtoImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ViewModuleDtoImplToJson(
      this,
    );
  }
}

abstract class _ViewModuleDto implements ViewModuleDto {
  const factory _ViewModuleDto(
      {final String? type,
      final String? title,
      final String? subtitle,
      final String? imageUrl}) = _$ViewModuleDtoImpl;

  factory _ViewModuleDto.fromJson(Map<String, dynamic> json) =
      _$ViewModuleDtoImpl.fromJson;

  @override
  String? get type;
  @override
  String? get title;
  @override
  String? get subtitle;
  @override
  String? get imageUrl;
  @override
  @JsonKey(ignore: true)
  _$$ViewModuleDtoImplCopyWith<_$ViewModuleDtoImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
