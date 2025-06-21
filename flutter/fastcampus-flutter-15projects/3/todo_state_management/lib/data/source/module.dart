import 'package:dio/dio.dart';
import 'package:fast_app_base/data/data.dart';
import 'package:injectable/injectable.dart';

@module
abstract class DataSourceModule {
  @singleton
  TodoDB get todoDB => TodoDB();

  @singleton
  TodoApi get todoApi => TodoApi(Dio());
}
