// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'todo.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_Todo _$$_TodoFromJson(Map<String, dynamic> json) => _$_Todo(
      id: json['id'] as int,
      createdTime: DateTime.parse(json['createdTime'] as String),
      modifyTime: json['modifyTime'] == null
          ? null
          : DateTime.parse(json['modifyTime'] as String),
      title: json['title'] as String,
      dueDate: DateTime.parse(json['dueDate'] as String),
      status: $enumDecodeNullable(_$TodoStatusEnumMap, json['status']) ??
          TodoStatus.unknown,
    );

Map<String, dynamic> _$$_TodoToJson(_$_Todo instance) => <String, dynamic>{
      'id': instance.id,
      'createdTime': instance.createdTime.toIso8601String(),
      'modifyTime': instance.modifyTime?.toIso8601String(),
      'title': instance.title,
      'dueDate': instance.dueDate.toIso8601String(),
      'status': _$TodoStatusEnumMap[instance.status]!,
    };

const _$TodoStatusEnumMap = {
  TodoStatus.incomplete: 'incomplete',
  TodoStatus.ongoing: 'ongoing',
  TodoStatus.complete: 'complete',
  TodoStatus.unknown: 'unknown',
};
