// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'vo_package.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

// ignore: non_constant_identifier_names
_$_Package _$$_PackageFromJson(Map<String, dynamic> json) => _$_Package(
      name: json['name'] as String,
      description: json['description'] as String,
      homepage: json['homepage'] as String?,
      repository: json['repository'] as String?,
      authors: (json['authors'] as List<dynamic>).map((e) => e as String).toList(),
      version: json['version'] as String,
      license: json['license'] as String?,
      isMarkdown: json['isMarkdown'] as bool,
      isSdk: json['isSdk'] as bool,
      isDirectDependency: json['isDirectDependency'] as bool,
    );

// ignore: non_constant_identifier_names
Map<String, dynamic> _$$_PackageToJson(_$_Package instance) => <String, dynamic>{
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
