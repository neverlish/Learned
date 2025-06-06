// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'w_floating_daangn_button.state.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$FloatingButtonState {
  bool get isExpanded => throw _privateConstructorUsedError;
  bool get isSmall => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $FloatingButtonStateCopyWith<FloatingButtonState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $FloatingButtonStateCopyWith<$Res> {
  factory $FloatingButtonStateCopyWith(
          FloatingButtonState value, $Res Function(FloatingButtonState) then) =
      _$FloatingButtonStateCopyWithImpl<$Res, FloatingButtonState>;
  @useResult
  $Res call({bool isExpanded, bool isSmall});
}

/// @nodoc
class _$FloatingButtonStateCopyWithImpl<$Res, $Val extends FloatingButtonState>
    implements $FloatingButtonStateCopyWith<$Res> {
  _$FloatingButtonStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? isExpanded = null,
    Object? isSmall = null,
  }) {
    return _then(_value.copyWith(
      isExpanded: null == isExpanded
          ? _value.isExpanded
          : isExpanded // ignore: cast_nullable_to_non_nullable
              as bool,
      isSmall: null == isSmall
          ? _value.isSmall
          : isSmall // ignore: cast_nullable_to_non_nullable
              as bool,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$FloatingButtonStateImplCopyWith<$Res>
    implements $FloatingButtonStateCopyWith<$Res> {
  factory _$$FloatingButtonStateImplCopyWith(_$FloatingButtonStateImpl value,
          $Res Function(_$FloatingButtonStateImpl) then) =
      __$$FloatingButtonStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call({bool isExpanded, bool isSmall});
}

/// @nodoc
class __$$FloatingButtonStateImplCopyWithImpl<$Res>
    extends _$FloatingButtonStateCopyWithImpl<$Res, _$FloatingButtonStateImpl>
    implements _$$FloatingButtonStateImplCopyWith<$Res> {
  __$$FloatingButtonStateImplCopyWithImpl(_$FloatingButtonStateImpl _value,
      $Res Function(_$FloatingButtonStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? isExpanded = null,
    Object? isSmall = null,
  }) {
    return _then(_$FloatingButtonStateImpl(
      null == isExpanded
          ? _value.isExpanded
          : isExpanded // ignore: cast_nullable_to_non_nullable
              as bool,
      null == isSmall
          ? _value.isSmall
          : isSmall // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _$FloatingButtonStateImpl implements _FloatingButtonState {
  const _$FloatingButtonStateImpl(this.isExpanded, this.isSmall);

  @override
  final bool isExpanded;
  @override
  final bool isSmall;

  @override
  String toString() {
    return 'FloatingButtonState(isExpanded: $isExpanded, isSmall: $isSmall)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$FloatingButtonStateImpl &&
            (identical(other.isExpanded, isExpanded) ||
                other.isExpanded == isExpanded) &&
            (identical(other.isSmall, isSmall) || other.isSmall == isSmall));
  }

  @override
  int get hashCode => Object.hash(runtimeType, isExpanded, isSmall);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$FloatingButtonStateImplCopyWith<_$FloatingButtonStateImpl> get copyWith =>
      __$$FloatingButtonStateImplCopyWithImpl<_$FloatingButtonStateImpl>(
          this, _$identity);
}

abstract class _FloatingButtonState implements FloatingButtonState {
  const factory _FloatingButtonState(
      final bool isExpanded, final bool isSmall) = _$FloatingButtonStateImpl;

  @override
  bool get isExpanded;
  @override
  bool get isSmall;
  @override
  @JsonKey(ignore: true)
  _$$FloatingButtonStateImplCopyWith<_$FloatingButtonStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
