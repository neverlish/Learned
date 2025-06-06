// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'vo_product_post.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$ProductPost {
  User get user => throw _privateConstructorUsedError;
  Product get product => throw _privateConstructorUsedError;
  String get content => throw _privateConstructorUsedError;
  Address get address => throw _privateConstructorUsedError;
  int get chatCount => throw _privateConstructorUsedError;
  int get likeCount => throw _privateConstructorUsedError;
  DateTime get createdTime => throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $ProductPostCopyWith<ProductPost> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ProductPostCopyWith<$Res> {
  factory $ProductPostCopyWith(
          ProductPost value, $Res Function(ProductPost) then) =
      _$ProductPostCopyWithImpl<$Res, ProductPost>;
  @useResult
  $Res call(
      {User user,
      Product product,
      String content,
      Address address,
      int chatCount,
      int likeCount,
      DateTime createdTime});

  $UserCopyWith<$Res> get user;
  $ProductCopyWith<$Res> get product;
  $AddressCopyWith<$Res> get address;
}

/// @nodoc
class _$ProductPostCopyWithImpl<$Res, $Val extends ProductPost>
    implements $ProductPostCopyWith<$Res> {
  _$ProductPostCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? user = null,
    Object? product = null,
    Object? content = null,
    Object? address = null,
    Object? chatCount = null,
    Object? likeCount = null,
    Object? createdTime = null,
  }) {
    return _then(_value.copyWith(
      user: null == user
          ? _value.user
          : user // ignore: cast_nullable_to_non_nullable
              as User,
      product: null == product
          ? _value.product
          : product // ignore: cast_nullable_to_non_nullable
              as Product,
      content: null == content
          ? _value.content
          : content // ignore: cast_nullable_to_non_nullable
              as String,
      address: null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as Address,
      chatCount: null == chatCount
          ? _value.chatCount
          : chatCount // ignore: cast_nullable_to_non_nullable
              as int,
      likeCount: null == likeCount
          ? _value.likeCount
          : likeCount // ignore: cast_nullable_to_non_nullable
              as int,
      createdTime: null == createdTime
          ? _value.createdTime
          : createdTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ) as $Val);
  }

  @override
  @pragma('vm:prefer-inline')
  $UserCopyWith<$Res> get user {
    return $UserCopyWith<$Res>(_value.user, (value) {
      return _then(_value.copyWith(user: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $ProductCopyWith<$Res> get product {
    return $ProductCopyWith<$Res>(_value.product, (value) {
      return _then(_value.copyWith(product: value) as $Val);
    });
  }

  @override
  @pragma('vm:prefer-inline')
  $AddressCopyWith<$Res> get address {
    return $AddressCopyWith<$Res>(_value.address, (value) {
      return _then(_value.copyWith(address: value) as $Val);
    });
  }
}

/// @nodoc
abstract class _$$ProductPostImplCopyWith<$Res>
    implements $ProductPostCopyWith<$Res> {
  factory _$$ProductPostImplCopyWith(
          _$ProductPostImpl value, $Res Function(_$ProductPostImpl) then) =
      __$$ProductPostImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {User user,
      Product product,
      String content,
      Address address,
      int chatCount,
      int likeCount,
      DateTime createdTime});

  @override
  $UserCopyWith<$Res> get user;
  @override
  $ProductCopyWith<$Res> get product;
  @override
  $AddressCopyWith<$Res> get address;
}

/// @nodoc
class __$$ProductPostImplCopyWithImpl<$Res>
    extends _$ProductPostCopyWithImpl<$Res, _$ProductPostImpl>
    implements _$$ProductPostImplCopyWith<$Res> {
  __$$ProductPostImplCopyWithImpl(
      _$ProductPostImpl _value, $Res Function(_$ProductPostImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? user = null,
    Object? product = null,
    Object? content = null,
    Object? address = null,
    Object? chatCount = null,
    Object? likeCount = null,
    Object? createdTime = null,
  }) {
    return _then(_$ProductPostImpl(
      null == user
          ? _value.user
          : user // ignore: cast_nullable_to_non_nullable
              as User,
      null == product
          ? _value.product
          : product // ignore: cast_nullable_to_non_nullable
              as Product,
      null == content
          ? _value.content
          : content // ignore: cast_nullable_to_non_nullable
              as String,
      null == address
          ? _value.address
          : address // ignore: cast_nullable_to_non_nullable
              as Address,
      null == chatCount
          ? _value.chatCount
          : chatCount // ignore: cast_nullable_to_non_nullable
              as int,
      null == likeCount
          ? _value.likeCount
          : likeCount // ignore: cast_nullable_to_non_nullable
              as int,
      null == createdTime
          ? _value.createdTime
          : createdTime // ignore: cast_nullable_to_non_nullable
              as DateTime,
    ));
  }
}

/// @nodoc

class _$ProductPostImpl implements _ProductPost {
  const _$ProductPostImpl(this.user, this.product, this.content, this.address,
      this.chatCount, this.likeCount, this.createdTime);

  @override
  final User user;
  @override
  final Product product;
  @override
  final String content;
  @override
  final Address address;
  @override
  final int chatCount;
  @override
  final int likeCount;
  @override
  final DateTime createdTime;

  @override
  String toString() {
    return 'ProductPost(user: $user, product: $product, content: $content, address: $address, chatCount: $chatCount, likeCount: $likeCount, createdTime: $createdTime)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ProductPostImpl &&
            (identical(other.user, user) || other.user == user) &&
            (identical(other.product, product) || other.product == product) &&
            (identical(other.content, content) || other.content == content) &&
            (identical(other.address, address) || other.address == address) &&
            (identical(other.chatCount, chatCount) ||
                other.chatCount == chatCount) &&
            (identical(other.likeCount, likeCount) ||
                other.likeCount == likeCount) &&
            (identical(other.createdTime, createdTime) ||
                other.createdTime == createdTime));
  }

  @override
  int get hashCode => Object.hash(runtimeType, user, product, content, address,
      chatCount, likeCount, createdTime);

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ProductPostImplCopyWith<_$ProductPostImpl> get copyWith =>
      __$$ProductPostImplCopyWithImpl<_$ProductPostImpl>(this, _$identity);
}

abstract class _ProductPost implements ProductPost {
  const factory _ProductPost(
      final User user,
      final Product product,
      final String content,
      final Address address,
      final int chatCount,
      final int likeCount,
      final DateTime createdTime) = _$ProductPostImpl;

  @override
  User get user;
  @override
  Product get product;
  @override
  String get content;
  @override
  Address get address;
  @override
  int get chatCount;
  @override
  int get likeCount;
  @override
  DateTime get createdTime;
  @override
  @JsonKey(ignore: true)
  _$$ProductPostImplCopyWith<_$ProductPostImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
