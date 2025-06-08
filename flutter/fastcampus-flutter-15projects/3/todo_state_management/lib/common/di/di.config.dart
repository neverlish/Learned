// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:fast_app_base/data/data.dart' as _i3;
import 'package:fast_app_base/data/repository/todo_repository.dart' as _i7;
import 'package:fast_app_base/data/source/local/error/local_db_error.dart'
    as _i6;
import 'package:fast_app_base/data/source/local/todo_db.dart' as _i8;
import 'package:fast_app_base/data/source/module.dart' as _i9;
import 'package:fast_app_base/domain/domain.dart' as _i5;
import 'package:fast_app_base/presentation/screen/main/tab/controller/todo_controller.dart'
    as _i4;
import 'package:get_it/get_it.dart' as _i1;
import 'package:injectable/injectable.dart' as _i2;

extension GetItInjectableX on _i1.GetIt {
// initializes the registration of main-scope dependencies inside of GetIt
  _i1.GetIt init({
    String? environment,
    _i2.EnvironmentFilter? environmentFilter,
  }) {
    final gh = _i2.GetItHelper(
      this,
      environment,
      environmentFilter,
    );
    final dataSourceModule = _$DataSourceModule();
    gh.singleton<_i3.TodoApi>(() => dataSourceModule.todoApi);
    gh.singleton<_i4.TodoController>(() => _i4.TodoController());
    gh.singleton<_i3.TodoDB>(() => dataSourceModule.todoDB);
    gh.singleton<_i5.TodoRepository<_i6.LocalDBError>>(
        () => _i7.TodoLocalRepository(gh<_i8.TodoDB>()));
    return this;
  }
}

class _$DataSourceModule extends _i9.DataSourceModule {}
