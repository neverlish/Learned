// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'todo_dto.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$_TodoDTO _$$_TodoDTOFromJson(Map<String, dynamic> json) => _$_TodoDTO(
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

Map<String, dynamic> _$$_TodoDTOToJson(_$_TodoDTO instance) =>
    <String, dynamic>{
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
