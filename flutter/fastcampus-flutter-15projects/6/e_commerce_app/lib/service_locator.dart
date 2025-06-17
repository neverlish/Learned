import 'package:get_it/get_it.dart';

import 'data/data_source/mock/display/display.mock_api.dart';
import 'data/data_source/remote/display/display.api.dart';
import 'data/repository_impl/display.repository_impl.dart';
import 'domain/repository/display.repository.dart';
import 'domain/usecase/display/display.usecase.dart';

final locator = GetIt.instance;

void setLocator() {
  _data();
  _domain();
}

void _data() {
  locator.registerSingleton<DisplayApi>(DisplayMockApi());
}

void _domain() {
  locator.registerSingleton<DisplayRepository>(
    DisplayRepositoryImpl(locator<DisplayApi>()),
  );

  locator.registerSingleton<DisplayUsecase>(
    DisplayUsecase(locator<DisplayRepository>()),
  );
}
