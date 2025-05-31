// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vo_todo.dart';

Todo _$TodoFromJson(Map<String, dynamic> json) => Todo(
      id: json['id'] as int,
      title: json['title'] as String,
      dueDate: DateTime.parse(json['dueDate'] as String),
      modifyTime: json['modifyTime'] == null ? null : DateTime.parse(json['modifyTime'] as String),
      status: $enumDecodeNullable(_$TodoStatusEnumMap, json['status']),
      createdTime:
          json['createdTime'] == null ? null : DateTime.parse(json['createdTime'] as String),
    );

Map<String, dynamic> _$TodoToJson(Todo instance) => <String, dynamic>{
      'id': instance.id,
      'title': instance.title,
      'createdTime': instance.createdTime.toIso8601String(),
      'modifyTime': instance.modifyTime?.toIso8601String(),
      'dueDate': instance.dueDate.toIso8601String(),
      'status': _$TodoStatusEnumMap[instance.status]!,
    };

const _$TodoStatusEnumMap = {
  TodoStatus.incomplete: 'incomplete',
  TodoStatus.ongoing: 'ongoing',
  TodoStatus.complete: 'complete',
};
