// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'users_providers.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

String _$userListHash() => r'c09b5bd70deb81a61e46c87b1f998079f20c09a8';

/// See also [userList].
@ProviderFor(userList)
final userListProvider = AutoDisposeFutureProvider<List<User>>.internal(
  userList,
  name: r'userListProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$userListHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef UserListRef = AutoDisposeFutureProviderRef<List<User>>;
String _$userDetailHash() => r'e6ceab78e0640335a3e98d4fca16f9c0551574e0';

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

/// See also [userDetail].
@ProviderFor(userDetail)
const userDetailProvider = UserDetailFamily();

/// See also [userDetail].
class UserDetailFamily extends Family<AsyncValue<User>> {
  /// See also [userDetail].
  const UserDetailFamily();

  static const Iterable<ProviderOrFamily>? _dependencies = null;

  static const Iterable<ProviderOrFamily>? _allTransitiveDependencies = null;

  @override
  Iterable<ProviderOrFamily>? get dependencies => _dependencies;

  @override
  Iterable<ProviderOrFamily>? get allTransitiveDependencies =>
      _allTransitiveDependencies;

  @override
  String? get name => r'userDetailProvider';

  /// See also [userDetail].
  UserDetailProvider call(
    int id,
  ) {
    return UserDetailProvider(
      id,
    );
  }

  @visibleForOverriding
  @override
  UserDetailProvider getProviderOverride(
    covariant UserDetailProvider provider,
  ) {
    return call(
      provider.id,
    );
  }

  /// Enables overriding the behavior of this provider, no matter the parameters.
  Override overrideWith(FutureOr<User> Function(UserDetailRef ref) create) {
    return _$UserDetailFamilyOverride(this, create);
  }
}

class _$UserDetailFamilyOverride implements FamilyOverride<AsyncValue<User>> {
  _$UserDetailFamilyOverride(this.overriddenFamily, this.create);

  final FutureOr<User> Function(UserDetailRef ref) create;

  @override
  final UserDetailFamily overriddenFamily;

  @override
  UserDetailProvider getProviderOverride(
    covariant UserDetailProvider provider,
  ) {
    return provider._copyWith(create);
  }
}

/// See also [userDetail].
class UserDetailProvider extends AutoDisposeFutureProvider<User> {
  /// See also [userDetail].
  UserDetailProvider(
    int id,
  ) : this._internal(
          (ref) => userDetail(
            ref as UserDetailRef,
            id,
          ),
          from: userDetailProvider,
          name: r'userDetailProvider',
          debugGetCreateSourceHash:
              const bool.fromEnvironment('dart.vm.product')
                  ? null
                  : _$userDetailHash,
          dependencies: UserDetailFamily._dependencies,
          allTransitiveDependencies:
              UserDetailFamily._allTransitiveDependencies,
          id: id,
        );

  UserDetailProvider._internal(
    super.create, {
    required super.name,
    required super.dependencies,
    required super.allTransitiveDependencies,
    required super.debugGetCreateSourceHash,
    required super.from,
    required this.id,
  }) : super.internal();

  final int id;

  @override
  Override overrideWith(
    FutureOr<User> Function(UserDetailRef ref) create,
  ) {
    return ProviderOverride(
      origin: this,
      override: UserDetailProvider._internal(
        (ref) => create(ref as UserDetailRef),
        from: from,
        name: null,
        dependencies: null,
        allTransitiveDependencies: null,
        debugGetCreateSourceHash: null,
        id: id,
      ),
    );
  }

  @override
  (int,) get argument {
    return (id,);
  }

  @override
  AutoDisposeFutureProviderElement<User> createElement() {
    return _UserDetailProviderElement(this);
  }

  UserDetailProvider _copyWith(
    FutureOr<User> Function(UserDetailRef ref) create,
  ) {
    return UserDetailProvider._internal(
      (ref) => create(ref as UserDetailRef),
      name: name,
      dependencies: dependencies,
      allTransitiveDependencies: allTransitiveDependencies,
      debugGetCreateSourceHash: debugGetCreateSourceHash,
      from: from,
      id: id,
    );
  }

  @override
  bool operator ==(Object other) {
    return other is UserDetailProvider && other.id == id;
  }

  @override
  int get hashCode {
    var hash = _SystemHash.combine(0, runtimeType.hashCode);
    hash = _SystemHash.combine(hash, id.hashCode);

    return _SystemHash.finish(hash);
  }
}

mixin UserDetailRef on AutoDisposeFutureProviderRef<User> {
  /// The parameter `id` of this provider.
  int get id;
}

class _UserDetailProviderElement extends AutoDisposeFutureProviderElement<User>
    with UserDetailRef {
  _UserDetailProviderElement(super.provider);

  @override
  int get id => (origin as UserDetailProvider).id;
}

String _$returnOneHash() => r'b50f93023d5599c0db9d8fcff7dfcbdcd470ffa6';

/// See also [returnOne].
@ProviderFor(returnOne)
final returnOneProvider = AutoDisposeFutureProvider<int>.internal(
  returnOne,
  name: r'returnOneProvider',
  debugGetCreateSourceHash:
      const bool.fromEnvironment('dart.vm.product') ? null : _$returnOneHash,
  dependencies: null,
  allTransitiveDependencies: null,
);

typedef ReturnOneRef = AutoDisposeFutureProviderRef<int>;
// ignore_for_file: type=lint
// ignore_for_file: subtype_of_sealed_class, invalid_use_of_internal_member, invalid_use_of_visible_for_testing_member, inference_failure_on_uninitialized_variable, inference_failure_on_function_return_type, inference_failure_on_untyped_parameter, deprecated_member_use_from_same_package
