// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'menu.dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$MenuDtoImpl _$$MenuDtoImplFromJson(Map<String, dynamic> json) =>
    _$MenuDtoImpl(
      tabId: (json['tabId'] as num?)?.toInt() ?? -1,
      title: json['title'] as String? ?? '',
    );

Map<String, dynamic> _$$MenuDtoImplToJson(_$MenuDtoImpl instance) =>
    <String, dynamic>{
      'tabId': instance.tabId,
      'title': instance.title,
    };
