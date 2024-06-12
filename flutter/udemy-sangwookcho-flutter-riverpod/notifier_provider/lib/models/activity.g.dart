// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'activity.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$ActivityImpl _$$ActivityImplFromJson(Map<String, dynamic> json) =>
    _$ActivityImpl(
      activity: json['activity'] as String,
      accessibility: (json['accessibility'] as num).toDouble(),
      type: json['type'] as String,
      participants: (json['participants'] as num).toInt(),
      price: (json['price'] as num).toDouble(),
      key: json['key'] as String,
    );

Map<String, dynamic> _$$ActivityImplToJson(_$ActivityImpl instance) =>
    <String, dynamic>{
      'activity': instance.activity,
      'accessibility': instance.accessibility,
      'type': instance.type,
      'participants': instance.participants,
      'price': instance.price,
      'key': instance.key,
    };
