// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'providers.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$ageHash() => r'e76f2aa0dc31ced2b865f4149076d7d4deb5c01e';

/// See also [age].
@ProviderFor(age)
final ageProvider = AutoDisposeProvider<String>.internal(
  age,
  name: r'ageProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$ageHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef AgeRef = AutoDisposeProviderRef<String>;
String _$cascadeCounterHash() => r'8304617c3d030372d8d77f97e952961c245f2878';

/// See also [CascadeCounter].
@ProviderFor(CascadeCounter)
final cascadeCounterProvider =
    AutoDisposeNotifierProvider<CascadeCounter, int>.internal(
  CascadeCounter.new,
  name: r'cascadeCounterProvider',
  debugGetCreateSourceHash: const bool.fromEnvironment('dart.vm.product')
      ? null
      : _$cascadeCounterHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef _$CascadeCounter = AutoDisposeNotifier<int>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member
