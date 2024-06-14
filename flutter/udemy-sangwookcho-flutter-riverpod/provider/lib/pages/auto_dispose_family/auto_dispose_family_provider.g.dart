// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'auto_dispose_family_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$autoDisposeFamilyHelloHash() =>
    r'9633033d4dd3bec72376fde65c66a52b6514e014';

/// Copied from Dart SDK
class _SystemHash {
  _SystemHash._();

  static int combine(int hash, int value) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + value);
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
    return hash ^ (hash >> 6);
  }

  static int finish(int hash) {
    // ignore: parameter_assignments
    hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
    // ignore: parameter_assignments
    hash = hash ^ (hash >> 11);
    return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
  }
}

/// See also [autoDisposeFamilyHello].
@ProviderFor(autoDisposeFamilyHello)
const autoDisposeFamilyHelloProvider = AutoDisposeFamilyHelloFamily();

/// See also [autoDisposeFamilyHello].
class AutoDisposeFamilyHelloFamily extends Family<String> {
  /// See also [autoDisposeFamilyHello].
  const AutoDisposeFamilyHelloFamily();

  /// See also [autoDisposeFamilyHello].
  AutoDisposeFamilyHelloProvider call({
    required String there,
  }) {
    return AutoDisposeFamilyHelloProvider(
      there: there,
    );
  }

  @visibleForOverriding
  @override
  AutoDisposeFamilyHelloProvider getProviderOverride(
    covariant AutoDisposeFamilyHelloProvider provider,
  ) {
    return call(
      there: provider.there,
    );
  }

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'autoDisposeFamilyHelloProvider';
}

/// See also [autoDisposeFamilyHello].
class AutoDisposeFamilyHelloProvider extends AutoDisposeProvider<String> {
  /// See also [autoDisposeFamilyHello].
  AutoDisposeFamilyHelloProvider({
    required String there,
  }) : this._internal(
          (ref) => autoDisposeFamilyHello(
            ref as AutoDisposeFamilyHelloRef,
            there: there,
          ),
          from: autoDisposeFamilyHelloProvider,
          name: r'autoDisposeFamilyHelloProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$autoDisposeFamilyHelloHash,
          dependencies: AutoDisposeFamilyHelloFamily._dependencies,
          allTransitiveDependencies:
              AutoDisposeFamilyHelloFamily._allTransitiveDependencies,
          there: there,
        );

  AutoDisposeFamilyHelloProvider._internal(
    super._createNotifier, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.there,
  }) : super.internal();

  final String there;

  @override
  Override overrideWith(
    String Function(AutoDisposeFamilyHelloRef provider) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: AutoDisposeFamilyHelloProvider._internal(
        (ref) => create(ref as AutoDisposeFamilyHelloRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        there: there,
      ),
    );
  }

  @override
  AutoDisposeProviderElement<String> createElement() {
    return _AutoDisposeFamilyHelloProviderElement(this);
  }

  @override
  bool operator ==(Object other) {
    return other is AutoDisposeFamilyHelloProvider && other.there == there;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, there.hashCode);

    return _SystemHash.finish(hash);
  }
}

mixin AutoDisposeFamilyHelloRef on AutoDisposeProviderRef<String> {
  /// The parameter `there` of this provider.
  String get there;
}

class _AutoDisposeFamilyHelloProviderElement
    extends AutoDisposeProviderElement<String> with AutoDisposeFamilyHelloRef {
  _AutoDisposeFamilyHelloProviderElement(super.provider);

  @override
  String get there => (origin as AutoDisposeFamilyHelloProvider).there;
}
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, inference_failure_on_uninitialized_variable, inference_failure_on_function_return_type, inference_failure_on_untyped_parameter
