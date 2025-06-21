// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vo_package.gen.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

_$PackageImpl _$$PackageImplFromJson(Map<String, dynamic> json) =>
    _$PackageImpl(
      name: json['name'] as String,
      description: json['description'] as String,
      homepage: json['homepage'] as String?,
      repository: json['repository'] as String?,
      authors:
          (json['authors'] as List<dynamic>).map((e) => e as String).toList(),
      version: json['version'] as String,
      license: json['license'] as String?,
      isMarkdown: json['isMarkdown'] as bool,
      isSdk: json['isSdk'] as bool,
      isDirectDependency: json['isDirectDependency'] as bool,
    );

Map<String, dynamic> _$$PackageImplToJson(_$PackageImpl instance) =>
    <String, dynamic>{
      'name': instance.name,
      'description': instance.description,
      'homepage': instance.homepage,
      'repository': instance.repository,
      'authors': instance.authors,
      'version': instance.version,
      'license': instance.license,
      'isMarkdown': instance.isMarkdown,
      'isSdk': instance.isSdk,
      'isDirectDependency': instance.isDirectDependency,
    };
