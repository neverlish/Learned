// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'view_module.dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ViewModuleDtoImpl _$$ViewModuleDtoImplFromJson(Map<String, dynamic> json) =>
    _$ViewModuleDtoImpl(
      type: json['type'] as String? ?? '',
      title: json['title'] as String? ?? '',
      subtitle: json['subtitle'] as String? ?? '',
      imageUrl: json['imageUrl'] as String? ?? '',
      time: (json['time'] as num?)?.toInt() ?? -1,
      products: (json['products'] as List<dynamic>?)
              ?.map((e) => ProductInfoDto.fromJson(e as Map<String, dynamic>))
              .toList() ??
          const <ProductInfoDto>[],
      tabs:
          (json['tabs'] as List<dynamic>?)?.map((e) => e as String).toList() ??
              const [],
    );

Map<String, dynamic> _$$ViewModuleDtoImplToJson(_$ViewModuleDtoImpl instance) =>
    <String, dynamic>{
      'type': instance.type,
      'title': instance.title,
      'subtitle': instance.subtitle,
      'imageUrl': instance.imageUrl,
      'time': instance.time,
      'products': instance.products,
      'tabs': instance.tabs,
    };
