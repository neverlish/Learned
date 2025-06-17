// GENERATED CODE - DO NOT MODIFY BY HAND

// **************************************************************************
// InjectableConfigGenerator
// **************************************************************************

// ignore_for_file: type=lint
// coverage:ignore-file

// ignore_for_file: no_leading_underscores_for_library_prefixes
import 'package:e_commerce_app/data/data_source/data_source.module.dart' as _i9;
import 'package:e_commerce_app/data/data_source/remote/display/display.api.dart'
    as _i3;
import 'package:e_commerce_app/data/repository_impl/display.repository_impl.dart'
    as _i5;
import 'package:e_commerce_app/domain/repository/display.repository.dart'
    as _i4;
import 'package:e_commerce_app/domain/usecase/display/display.usecase.dart'
    as _i6;
import 'package:e_commerce_app/presentation/pages/home/bloc/menu_bloc/menu_bloc.dart'
    as _i7;
import 'package:e_commerce_app/presentation/pages/home/bloc/view_module_bloc/view_module_bloc.dart'
    as _i8;
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
    gh.singleton<_i3.DisplayApi>(() => dataSourceModule.displayApi);
    gh.singleton<_i4.DisplayRepository>(
        () => _i5.DisplayRepositoryImpl(gh<_i3.DisplayApi>()));
    gh.singleton<_i6.DisplayUsecase>(
        () => _i6.DisplayUsecase(gh<_i4.DisplayRepository>()));
    gh.factory<_i7.MenuBloc>(() => _i7.MenuBloc(gh<_i6.DisplayUsecase>()));
    gh.factory<_i8.ViewModuleBloc>(
        () => _i8.ViewModuleBloc(gh<_i6.DisplayUsecase>()));
    return this;
  }
}

class _$DataSourceModule extends _i9.DataSourceModule {}
