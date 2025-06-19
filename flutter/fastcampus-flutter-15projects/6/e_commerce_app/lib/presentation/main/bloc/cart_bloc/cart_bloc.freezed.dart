// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'cart_bloc.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$CartState {
  CartStatus get status => throw _privateConstructorUsedError;
  ErrorResponse get error => throw _privateConstructorUsedError;
  ProductInfo get productInfo => throw _privateConstructorUsedError;
  int get quantity => throw _privateConstructorUsedError;
  int get totalPrice => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $CartStateCopyWith<CartState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $CartStateCopyWith<$Res> {
  factory $CartStateCopyWith(CartState value, $Res Function(CartState) then) =
      _$CartStateCopyWithImpl<$Res, CartState>;
  @useResult
  $Res call(
      {CartStatus status,
      ErrorResponse error,
      ProductInfo productInfo,
      int quantity,
      int totalPrice});

  $ProductInfoCopyWith<$Res> get productInfo;
}

/// @nodoc
class _$CartStateCopyWithImpl<$Res, $Val extends CartState>
    implements $CartStateCopyWith<$Res> {
  _$CartStateCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? error = null,
    Object? productInfo = null,
    Object? quantity = null,
    Object? totalPrice = null,
  }) {
    return _then(_value.copyWith(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as CartStatus,
      error: null == error
          ? _value.error
          : error // ignore: cast_nullable_to_non_nullable
              as ErrorResponse,
      productInfo: null == productInfo
          ? _value.productInfo
          : productInfo // ignore: cast_nullable_to_non_nullable
              as ProductInfo,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as int,
      totalPrice: null == totalPrice
          ? _value.totalPrice
          : totalPrice // ignore: cast_nullable_to_non_nullable
              as int,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $ProductInfoCopyWith<$Res> get productInfo {
    return $ProductInfoCopyWith<$Res>(_value.productInfo, (value) {
      return _then(_value.copyWith(productInfo: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$CartStateImplCopyWith<$Res>
    implements $CartStateCopyWith<$Res> {
  factory _$$CartStateImplCopyWith(
          _$CartStateImpl value, $Res Function(_$CartStateImpl) then) =
      __$$CartStateImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {CartStatus status,
      ErrorResponse error,
      ProductInfo productInfo,
      int quantity,
      int totalPrice});

  @override
  $ProductInfoCopyWith<$Res> get productInfo;
}

/// @nodoc
class __$$CartStateImplCopyWithImpl<$Res>
    extends _$CartStateCopyWithImpl<$Res, _$CartStateImpl>
    implements _$$CartStateImplCopyWith<$Res> {
  __$$CartStateImplCopyWithImpl(
      _$CartStateImpl _value, $Res Function(_$CartStateImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? status = null,
    Object? error = null,
    Object? productInfo = null,
    Object? quantity = null,
    Object? totalPrice = null,
  }) {
    return _then(_$CartStateImpl(
      status: null == status
          ? _value.status
          : status // ignore: cast_nullable_to_non_nullable
              as CartStatus,
      error: null == error
          ? _value.error
          : error // ignore: cast_nullable_to_non_nullable
              as ErrorResponse,
      productInfo: null == productInfo
          ? _value.productInfo
          : productInfo // ignore: cast_nullable_to_non_nullable
              as ProductInfo,
      quantity: null == quantity
          ? _value.quantity
          : quantity // ignore: cast_nullable_to_non_nullable
              as int,
      totalPrice: null == totalPrice
          ? _value.totalPrice
          : totalPrice // ignore: cast_nullable_to_non_nullable
              as int,
    ));
  }
}

/// @nodoc

class _$CartStateImpl implements _CartState {
  _$CartStateImpl(
      {this.status = CartStatus.close,
      this.error = const ErrorResponse(),
      this.productInfo = const ProductInfo(
          productId: '',
          title: '',
          subtitle: '',
          imageUrl: '',
          price: -1,
          originalPrice: -1,
          discrountRate: -1,
          reviewCount: -1),
      this.quantity = 1,
      this.totalPrice = 0});

  @override
  @JsonKey()
  final CartStatus status;
  @override
  @JsonKey()
  final ErrorResponse error;
  @override
  @JsonKey()
  final ProductInfo productInfo;
  @override
  @JsonKey()
  final int quantity;
  @override
  @JsonKey()
  final int totalPrice;

  @override
  String toString() {
    return 'CartState(status: $status, error: $error, productInfo: $productInfo, quantity: $quantity, totalPrice: $totalPrice)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$CartStateImpl &&
            (identical(other.status, status) || other.status == status) &&
            (identical(other.error, error) || other.error == error) &&
            (identical(other.productInfo, productInfo) ||
                other.productInfo == productInfo) &&
            (identical(other.quantity, quantity) ||
                other.quantity == quantity) &&
            (identical(other.totalPrice, totalPrice) ||
                other.totalPrice == totalPrice));
  }

  @override
  int get hashCode => Object.hash(
      runtimeType, status, error, productInfo, quantity, totalPrice);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$CartStateImplCopyWith<_$CartStateImpl> get copyWith =>
      __$$CartStateImplCopyWithImpl<_$CartStateImpl>(this, _$identity);
}

abstract class _CartState implements CartState {
  factory _CartState(
      {final CartStatus status,
      final ErrorResponse error,
      final ProductInfo productInfo,
      final int quantity,
      final int totalPrice}) = _$CartStateImpl;

  @override
  CartStatus get status;
  @override
  ErrorResponse get error;
  @override
  ProductInfo get productInfo;
  @override
  int get quantity;
  @override
  int get totalPrice;
  @override
  @JsonKey(ignore: true)
  _$$CartStateImplCopyWith<_$CartStateImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
