// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'view_module_bloc.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$ViewModuleState {
  Status get status => throw _privateConstructorUsedError;
  ErrorResponse get error => throw _privateConstructorUsedError;
  int get tabId => throw _privateConstructorUsedError;
  int get currentPage => throw _privateConstructorUsedError;
  bool get isEndOfPage => throw _privateConstructorUsedError;
  List<Widget> get viewModules => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $ViewModuleStateCopyWith<ViewModuleState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ViewModuleStateCopyWith<$Res> {
  factory $ViewModuleStateCopyWith(
          ViewModuleState value, $Res Function(ViewModuleState) then) =
      _$ViewModuleStateCopyWithImpl<$Res, ViewModuleState>;
  @useResult
  $Res call(
      {Status status,
      ErrorResponse error,
      int tabId,
      int currentPage,
      bool isEndOfPage,
      List<Widget> viewModules});
}

/// @nodoc
class _$ViewModuleStateCopyWithImpl<$Res, $Val extends ViewModuleState>
    implements $ViewModuleStateCopyWith<$Res> {
  _$ViewModuleStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? error = null,
    Object? tabId = null,
    Object? currentPage = null,
    Object? isEndOfPage = null,
    Object? viewModules = null,
  }) {
    return _then(_value.copyWith(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as Status,
      error: null == error
          ? _value.error
          : error // ignore: cast_nullable_to_non_nullable
              as ErrorResponse,
      tabId: null == tabId
          ? _value.tabId
          : tabId // ignore: cast_nullable_to_non_nullable
              as int,
      currentPage: null == currentPage
          ? _value.currentPage
          : currentPage // ignore: cast_nullable_to_non_nullable
              as int,
      isEndOfPage: null == isEndOfPage
          ? _value.isEndOfPage
          : isEndOfPage // ignore: cast_nullable_to_non_nullable
              as bool,
      viewModules: null == viewModules
          ? _value.viewModules
          : viewModules // ignore: cast_nullable_to_non_nullable
              as List<Widget>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ViewModuleStateImplCopyWith<$Res>
    implements $ViewModuleStateCopyWith<$Res> {
  factory _$$ViewModuleStateImplCopyWith(_$ViewModuleStateImpl value,
          $Res Function(_$ViewModuleStateImpl) then) =
      __$$ViewModuleStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {Status status,
      ErrorResponse error,
      int tabId,
      int currentPage,
      bool isEndOfPage,
      List<Widget> viewModules});
}

/// @nodoc
class __$$ViewModuleStateImplCopyWithImpl<$Res>
    extends _$ViewModuleStateCopyWithImpl<$Res, _$ViewModuleStateImpl>
    implements _$$ViewModuleStateImplCopyWith<$Res> {
  __$$ViewModuleStateImplCopyWithImpl(
      _$ViewModuleStateImpl _value, $Res Function(_$ViewModuleStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? error = null,
    Object? tabId = null,
    Object? currentPage = null,
    Object? isEndOfPage = null,
    Object? viewModules = null,
  }) {
    return _then(_$ViewModuleStateImpl(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as Status,
      error: null == error
          ? _value.error
          : error // ignore: cast_nullable_to_non_nullable
              as ErrorResponse,
      tabId: null == tabId
          ? _value.tabId
          : tabId // ignore: cast_nullable_to_non_nullable
              as int,
      currentPage: null == currentPage
          ? _value.currentPage
          : currentPage // ignore: cast_nullable_to_non_nullable
              as int,
      isEndOfPage: null == isEndOfPage
          ? _value.isEndOfPage
          : isEndOfPage // ignore: cast_nullable_to_non_nullable
              as bool,
      viewModules: null == viewModules
          ? _value._viewModules
          : viewModules // ignore: cast_nullable_to_non_nullable
              as List<Widget>,
    ));
  }
}

/// @nodoc

class _$ViewModuleStateImpl implements _ViewModuleState {
  _$ViewModuleStateImpl(
      {this.status = Status.initial,
      this.error = const ErrorResponse(),
      this.tabId = 0,
      this.currentPage = 1,
      this.isEndOfPage = false,
      final List<Widget> viewModules = const <Widget>[]})
      : _viewModules = viewModules;

  @override
  @JsonKey()
  final Status status;
  @override
  @JsonKey()
  final ErrorResponse error;
  @override
  @JsonKey()
  final int tabId;
  @override
  @JsonKey()
  final int currentPage;
  @override
  @JsonKey()
  final bool isEndOfPage;
  final List<Widget> _viewModules;
  @override
  @JsonKey()
  List<Widget> get viewModules {
    if (_viewModules is EqualUnmodifiableListView) return _viewModules;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_viewModules);
  }

  @override
  String toString() {
    return 'ViewModuleState(status: $status, error: $error, tabId: $tabId, currentPage: $currentPage, isEndOfPage: $isEndOfPage, viewModules: $viewModules)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ViewModuleStateImpl &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.error, error) || other.error == error) &&
            (identical(other.tabId, tabId) || other.tabId == tabId) &&
            (identical(other.currentPage, currentPage) ||
                other.currentPage == currentPage) &&
            (identical(other.isEndOfPage, isEndOfPage) ||
                other.isEndOfPage == isEndOfPage) &&
            const DeepCollectionEquality()
                .equals(other._viewModules, _viewModules));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType,
      status,
      error,
      tabId,
      currentPage,
      isEndOfPage,
      const DeepCollectionEquality().hash(_viewModules));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ViewModuleStateImplCopyWith<_$ViewModuleStateImpl> get copyWith =>
      __$$ViewModuleStateImplCopyWithImpl<_$ViewModuleStateImpl>(
          this, _$identity);
}

abstract class _ViewModuleState implements ViewModuleState {
  factory _ViewModuleState(
      {final Status status,
      final ErrorResponse error,
      final int tabId,
      final int currentPage,
      final bool isEndOfPage,
      final List<Widget> viewModules}) = _$ViewModuleStateImpl;

  @override
  Status get status;
  @override
  ErrorResponse get error;
  @override
  int get tabId;
  @override
  int get currentPage;
  @override
  bool get isEndOfPage;
  @override
  List<Widget> get viewModules;
  @override
  @JsonKey(ignore: true)
  _$$ViewModuleStateImplCopyWith<_$ViewModuleStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
