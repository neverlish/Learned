import 'package:get_it/get_it.dart';
import 'package:injectable/injectable.dart';

import 'di.config.dart';

/// getIt, inject, locator
final locator = GetIt.instance;

@InjectableInit()
void configureDependencies() => locator.init();
