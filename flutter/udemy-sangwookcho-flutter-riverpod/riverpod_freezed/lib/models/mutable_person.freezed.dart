// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'mutable_person.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$MutablePerson {
  int get id => throw _privateConstructorUsedError;
  String get name => throw _privateConstructorUsedError;
  set name(String value) => throw _privateConstructorUsedError;
  String get email => throw _privateConstructorUsedError;
  set email(String value) => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $MutablePersonCopyWith<MutablePerson> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MutablePersonCopyWith<$Res> {
  factory $MutablePersonCopyWith(
          MutablePerson value, $Res Function(MutablePerson) then) =
      _$MutablePersonCopyWithImpl<$Res, MutablePerson>;
  @useResult
  $Res call({int id, String name, String email});
}

/// @nodoc
class _$MutablePersonCopyWithImpl<$Res, $Val extends MutablePerson>
    implements $MutablePersonCopyWith<$Res> {
  _$MutablePersonCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
  }) {
    return _then(_value.copyWith(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      email: null == email
          ? _value.email
          : email // ignore: cast_nullable_to_non_nullable
              as String,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$MutablePersonImplCopyWith<$Res>
    implements $MutablePersonCopyWith<$Res> {
  factory _$$MutablePersonImplCopyWith(
          _$MutablePersonImpl value, $Res Function(_$MutablePersonImpl) then) =
      __$$MutablePersonImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({int id, String name, String email});
}

/// @nodoc
class __$$MutablePersonImplCopyWithImpl<$Res>
    extends _$MutablePersonCopyWithImpl<$Res, _$MutablePersonImpl>
    implements _$$MutablePersonImplCopyWith<$Res> {
  __$$MutablePersonImplCopyWithImpl(
      _$MutablePersonImpl _value, $Res Function(_$MutablePersonImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? id = null,
    Object? name = null,
    Object? email = null,
  }) {
    return _then(_$MutablePersonImpl(
      id: null == id
          ? _value.id
          : id // ignore: cast_nullable_to_non_nullable
              as int,
      name: null == name
          ? _value.name
          : name // ignore: cast_nullable_to_non_nullable
              as String,
      email: null == email
          ? _value.email
          : email // ignore: cast_nullable_to_non_nullable
              as String,
    ));
  }
}

/// @nodoc

class _$MutablePersonImpl
    with DiagnosticableTreeMixin
    implements _MutablePerson {
  _$MutablePersonImpl(
      {required this.id, required this.name, required this.email});

  @override
  final int id;
  @override
  String name;
  @override
  String email;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'MutablePerson(id: $id, name: $name, email: $email)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'MutablePerson'))
      ..add(DiagnosticsProperty('id', id))
      ..add(DiagnosticsProperty('name', name))
      ..add(DiagnosticsProperty('email', email));
  }

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$MutablePersonImplCopyWith<_$MutablePersonImpl> get copyWith =>
      __$$MutablePersonImplCopyWithImpl<_$MutablePersonImpl>(this, _$identity);
}

abstract class _MutablePerson implements MutablePerson {
  factory _MutablePerson(
      {required final int id,
      required String name,
      required String email}) = _$MutablePersonImpl;

  @override
  int get id;
  @override
  String get name;
  set name(String value);
  @override
  String get email;
  set email(String value);
  @override
  @JsonKey(ignore: true)
  _$$MutablePersonImplCopyWith<_$MutablePersonImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
