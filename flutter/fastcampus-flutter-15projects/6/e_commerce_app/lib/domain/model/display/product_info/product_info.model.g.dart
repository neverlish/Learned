// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'product_info.model.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ProductInfoImpl _$$ProductInfoImplFromJson(Map<String, dynamic> json) =>
    _$ProductInfoImpl(
      productId: json['productId'] as String,
      title: json['title'] as String,
      subtitle: json['subtitle'] as String,
      imageUrl: json['imageUrl'] as String,
      price: (json['price'] as num).toInt(),
      originalPrice: (json['originalPrice'] as num).toInt(),
      discrountRate: (json['discrountRate'] as num).toInt(),
      reviewCount: (json['reviewCount'] as num).toInt(),
    );

Map<String, dynamic> _$$ProductInfoImplToJson(_$ProductInfoImpl instance) =>
    <String, dynamic>{
      'productId': instance.productId,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'imageUrl': instance.imageUrl,
      'price': instance.price,
      'originalPrice': instance.originalPrice,
      'discrountRate': instance.discrountRate,
      'reviewCount': instance.reviewCount,
    };
