import 'package:flutter_riverpod/flutter_riverpod.dart';

class Logger extends ProviderObserver {
  @override
  void didAddProvider(
    ProviderBase<Object?> provider,
    Object? value,
    ProviderContainer container,
  ) {
    print('''
{
  "provider": "${provider.name ?? provider.runtimeType} is initialized",
  "value exposed": "$value"
}
''');
    super.didAddProvider(provider, value, container);
  }

  @override
  void didDisposeProvider(
    ProviderBase<Object?> provider,
    ProviderContainer container,
  ) {
    print('''
{
  "provider": "${provider.name ?? provider.runtimeType} is disposed"
}
  ''');
    super.didDisposeProvider(provider, container);
  }

  @override
  void didUpdateProvider(
    ProviderBase<Object?> provider,
    Object? previousValue,
    Object? newValue,
    ProviderContainer container,
  ) {
    print('''
{
  "provider": "${provider.name ?? provider.runtimeType} is updated",
  "previous value": "$previousValue",
  "new value": "$newValue"
}
''');
    super.didUpdateProvider(provider, previousValue, newValue, container);
  }
}
