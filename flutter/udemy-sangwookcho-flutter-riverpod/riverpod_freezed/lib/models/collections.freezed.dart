// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'collections.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
mixin _$ImmutableColl {
  List<int> get list => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $ImmutableCollCopyWith<ImmutableColl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ImmutableCollCopyWith<$Res> {
  factory $ImmutableCollCopyWith(
          ImmutableColl value, $Res Function(ImmutableColl) then) =
      _$ImmutableCollCopyWithImpl<$Res, ImmutableColl>;
  @useResult
  $Res call({List<int> list});
}

/// @nodoc
class _$ImmutableCollCopyWithImpl<$Res, $Val extends ImmutableColl>
    implements $ImmutableCollCopyWith<$Res> {
  _$ImmutableCollCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? list = null,
  }) {
    return _then(_value.copyWith(
      list: null == list
          ? _value.list
          : list // ignore: cast_nullable_to_non_nullable
              as List<int>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ImmutableCollImplCopyWith<$Res>
    implements $ImmutableCollCopyWith<$Res> {
  factory _$$ImmutableCollImplCopyWith(
          _$ImmutableCollImpl value, $Res Function(_$ImmutableCollImpl) then) =
      __$$ImmutableCollImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<int> list});
}

/// @nodoc
class __$$ImmutableCollImplCopyWithImpl<$Res>
    extends _$ImmutableCollCopyWithImpl<$Res, _$ImmutableCollImpl>
    implements _$$ImmutableCollImplCopyWith<$Res> {
  __$$ImmutableCollImplCopyWithImpl(
      _$ImmutableCollImpl _value, $Res Function(_$ImmutableCollImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? list = null,
  }) {
    return _then(_$ImmutableCollImpl(
      null == list
          ? _value._list
          : list // ignore: cast_nullable_to_non_nullable
              as List<int>,
    ));
  }
}

/// @nodoc

class _$ImmutableCollImpl
    with DiagnosticableTreeMixin
    implements _ImmutableColl {
  _$ImmutableCollImpl(final List<int> list) : _list = list;

  final List<int> _list;
  @override
  List<int> get list {
    if (_list is EqualUnmodifiableListView) return _list;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_list);
  }

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'ImmutableColl(list: $list)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'ImmutableColl'))
      ..add(DiagnosticsProperty('list', list));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ImmutableCollImpl &&
            const DeepCollectionEquality().equals(other._list, _list));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(_list));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ImmutableCollImplCopyWith<_$ImmutableCollImpl> get copyWith =>
      __$$ImmutableCollImplCopyWithImpl<_$ImmutableCollImpl>(this, _$identity);
}

abstract class _ImmutableColl implements ImmutableColl {
  factory _ImmutableColl(final List<int> list) = _$ImmutableCollImpl;

  @override
  List<int> get list;
  @override
  @JsonKey(ignore: true)
  _$$ImmutableCollImplCopyWith<_$ImmutableCollImpl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
mixin _$MutableColl {
  List<int> get list => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $MutableCollCopyWith<MutableColl> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $MutableCollCopyWith<$Res> {
  factory $MutableCollCopyWith(
          MutableColl value, $Res Function(MutableColl) then) =
      _$MutableCollCopyWithImpl<$Res, MutableColl>;
  @useResult
  $Res call({List<int> list});
}

/// @nodoc
class _$MutableCollCopyWithImpl<$Res, $Val extends MutableColl>
    implements $MutableCollCopyWith<$Res> {
  _$MutableCollCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? list = null,
  }) {
    return _then(_value.copyWith(
      list: null == list
          ? _value.list
          : list // ignore: cast_nullable_to_non_nullable
              as List<int>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$MutableCollImplCopyWith<$Res>
    implements $MutableCollCopyWith<$Res> {
  factory _$$MutableCollImplCopyWith(
          _$MutableCollImpl value, $Res Function(_$MutableCollImpl) then) =
      __$$MutableCollImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({List<int> list});
}

/// @nodoc
class __$$MutableCollImplCopyWithImpl<$Res>
    extends _$MutableCollCopyWithImpl<$Res, _$MutableCollImpl>
    implements _$$MutableCollImplCopyWith<$Res> {
  __$$MutableCollImplCopyWithImpl(
      _$MutableCollImpl _value, $Res Function(_$MutableCollImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? list = null,
  }) {
    return _then(_$MutableCollImpl(
      null == list
          ? _value.list
          : list // ignore: cast_nullable_to_non_nullable
              as List<int>,
    ));
  }
}

/// @nodoc

class _$MutableCollImpl with DiagnosticableTreeMixin implements _MutableColl {
  _$MutableCollImpl(this.list);

  @override
  final List<int> list;

  @override
  String toString({DiagnosticLevel minLevel = DiagnosticLevel.info}) {
    return 'MutableColl(list: $list)';
  }

  @override
  void debugFillProperties(DiagnosticPropertiesBuilder properties) {
    super.debugFillProperties(properties);
    properties
      ..add(DiagnosticsProperty('type', 'MutableColl'))
      ..add(DiagnosticsProperty('list', list));
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$MutableCollImpl &&
            const DeepCollectionEquality().equals(other.list, list));
  }

  @override
  int get hashCode =>
      Object.hash(runtimeType, const DeepCollectionEquality().hash(list));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$MutableCollImplCopyWith<_$MutableCollImpl> get copyWith =>
      __$$MutableCollImplCopyWithImpl<_$MutableCollImpl>(this, _$identity);
}

abstract class _MutableColl implements MutableColl {
  factory _MutableColl(final List<int> list) = _$MutableCollImpl;

  @override
  List<int> get list;
  @override
  @JsonKey(ignore: true)
  _$$MutableCollImplCopyWith<_$MutableCollImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
