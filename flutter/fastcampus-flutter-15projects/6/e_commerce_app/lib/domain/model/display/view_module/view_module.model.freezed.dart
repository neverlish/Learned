// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'view_module.model.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

ViewModule _$ViewModuleFromJson(Map<String, dynamic> json) {
  return _ViewModule.fromJson(json);
}

/// @nodoc
mixin _$ViewModule {
  String get type => throw _privateConstructorUsedError;
  String get title => throw _privateConstructorUsedError;
  String get subtitle => throw _privateConstructorUsedError;
  String get imageUrl => throw _privateConstructorUsedError;
  List<ProductInfo> get products => throw _privateConstructorUsedError;
  int get time => throw _privateConstructorUsedError;
  List<String> get tabs => throw _privateConstructorUsedError;

  Map<String, dynamic> toJson() => throw _privateConstructorUsedError;
  @JsonKey(ignore: true)
  $ViewModuleCopyWith<ViewModule> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $ViewModuleCopyWith<$Res> {
  factory $ViewModuleCopyWith(
          ViewModule value, $Res Function(ViewModule) then) =
      _$ViewModuleCopyWithImpl<$Res, ViewModule>;
  @useResult
  $Res call(
      {String type,
      String title,
      String subtitle,
      String imageUrl,
      List<ProductInfo> products,
      int time,
      List<String> tabs});
}

/// @nodoc
class _$ViewModuleCopyWithImpl<$Res, $Val extends ViewModule>
    implements $ViewModuleCopyWith<$Res> {
  _$ViewModuleCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? title = null,
    Object? subtitle = null,
    Object? imageUrl = null,
    Object? products = null,
    Object? time = null,
    Object? tabs = null,
  }) {
    return _then(_value.copyWith(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      subtitle: null == subtitle
          ? _value.subtitle
          : subtitle // ignore: cast_nullable_to_non_nullable
              as String,
      imageUrl: null == imageUrl
          ? _value.imageUrl
          : imageUrl // ignore: cast_nullable_to_non_nullable
              as String,
      products: null == products
          ? _value.products
          : products // ignore: cast_nullable_to_non_nullable
              as List<ProductInfo>,
      time: null == time
          ? _value.time
          : time // ignore: cast_nullable_to_non_nullable
              as int,
      tabs: null == tabs
          ? _value.tabs
          : tabs // ignore: cast_nullable_to_non_nullable
              as List<String>,
    ) as $Val);
  }
}

/// @nodoc
abstract class _$$ViewModuleImplCopyWith<$Res>
    implements $ViewModuleCopyWith<$Res> {
  factory _$$ViewModuleImplCopyWith(
          _$ViewModuleImpl value, $Res Function(_$ViewModuleImpl) then) =
      __$$ViewModuleImplCopyWithImpl<$Res>;
  @override
  @useResult
  $Res call(
      {String type,
      String title,
      String subtitle,
      String imageUrl,
      List<ProductInfo> products,
      int time,
      List<String> tabs});
}

/// @nodoc
class __$$ViewModuleImplCopyWithImpl<$Res>
    extends _$ViewModuleCopyWithImpl<$Res, _$ViewModuleImpl>
    implements _$$ViewModuleImplCopyWith<$Res> {
  __$$ViewModuleImplCopyWithImpl(
      _$ViewModuleImpl _value, $Res Function(_$ViewModuleImpl) _then)
      : super(_value, _then);

  @pragma('vm:prefer-inline')
  @override
  $Res call({
    Object? type = null,
    Object? title = null,
    Object? subtitle = null,
    Object? imageUrl = null,
    Object? products = null,
    Object? time = null,
    Object? tabs = null,
  }) {
    return _then(_$ViewModuleImpl(
      type: null == type
          ? _value.type
          : type // ignore: cast_nullable_to_non_nullable
              as String,
      title: null == title
          ? _value.title
          : title // ignore: cast_nullable_to_non_nullable
              as String,
      subtitle: null == subtitle
          ? _value.subtitle
          : subtitle // ignore: cast_nullable_to_non_nullable
              as String,
      imageUrl: null == imageUrl
          ? _value.imageUrl
          : imageUrl // ignore: cast_nullable_to_non_nullable
              as String,
      products: null == products
          ? _value._products
          : products // ignore: cast_nullable_to_non_nullable
              as List<ProductInfo>,
      time: null == time
          ? _value.time
          : time // ignore: cast_nullable_to_non_nullable
              as int,
      tabs: null == tabs
          ? _value._tabs
          : tabs // ignore: cast_nullable_to_non_nullable
              as List<String>,
    ));
  }
}

/// @nodoc
@JsonSerializable()
class _$ViewModuleImpl implements _ViewModule {
  const _$ViewModuleImpl(
      {required this.type,
      required this.title,
      required this.subtitle,
      required this.imageUrl,
      required final List<ProductInfo> products,
      required this.time,
      required final List<String> tabs})
      : _products = products,
        _tabs = tabs;

  factory _$ViewModuleImpl.fromJson(Map<String, dynamic> json) =>
      _$$ViewModuleImplFromJson(json);

  @override
  final String type;
  @override
  final String title;
  @override
  final String subtitle;
  @override
  final String imageUrl;
  final List<ProductInfo> _products;
  @override
  List<ProductInfo> get products {
    if (_products is EqualUnmodifiableListView) return _products;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_products);
  }

  @override
  final int time;
  final List<String> _tabs;
  @override
  List<String> get tabs {
    if (_tabs is EqualUnmodifiableListView) return _tabs;
    // ignore: implicit_dynamic_type
    return EqualUnmodifiableListView(_tabs);
  }

  @override
  String toString() {
    return 'ViewModule(type: $type, title: $title, subtitle: $subtitle, imageUrl: $imageUrl, products: $products, time: $time, tabs: $tabs)';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _$ViewModuleImpl &&
            (identical(other.type, type) || other.type == type) &&
            (identical(other.title, title) || other.title == title) &&
            (identical(other.subtitle, subtitle) ||
                other.subtitle == subtitle) &&
            (identical(other.imageUrl, imageUrl) ||
                other.imageUrl == imageUrl) &&
            const DeepCollectionEquality().equals(other._products, _products) &&
            (identical(other.time, time) || other.time == time) &&
            const DeepCollectionEquality().equals(other._tabs, _tabs));
  }

  @JsonKey(ignore: true)
  @override
  int get hashCode => Object.hash(
      runtimeType,
      type,
      title,
      subtitle,
      imageUrl,
      const DeepCollectionEquality().hash(_products),
      time,
      const DeepCollectionEquality().hash(_tabs));

  @JsonKey(ignore: true)
  @override
  @pragma('vm:prefer-inline')
  _$$ViewModuleImplCopyWith<_$ViewModuleImpl> get copyWith =>
      __$$ViewModuleImplCopyWithImpl<_$ViewModuleImpl>(this, _$identity);

  @override
  Map<String, dynamic> toJson() {
    return _$$ViewModuleImplToJson(
      this,
    );
  }
}

abstract class _ViewModule implements ViewModule {
  const factory _ViewModule(
      {required final String type,
      required final String title,
      required final String subtitle,
      required final String imageUrl,
      required final List<ProductInfo> products,
      required final int time,
      required final List<String> tabs}) = _$ViewModuleImpl;

  factory _ViewModule.fromJson(Map<String, dynamic> json) =
      _$ViewModuleImpl.fromJson;

  @override
  String get type;
  @override
  String get title;
  @override
  String get subtitle;
  @override
  String get imageUrl;
  @override
  List<ProductInfo> get products;
  @override
  int get time;
  @override
  List<String> get tabs;
  @override
  @JsonKey(ignore: true)
  _$$ViewModuleImplCopyWith<_$ViewModuleImpl> get copyWith =>
      throw _privateConstructorUsedError;
}
