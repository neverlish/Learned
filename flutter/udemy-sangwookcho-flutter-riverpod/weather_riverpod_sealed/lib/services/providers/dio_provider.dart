import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:dio/dio.dart';
import 'package:weather_riverpod_sealed/constants/constants.dart';

part 'dio_provider.g.dart';

@riverpod
Dio dio(DioRef ref) {
  final options = BaseOptions(baseUrl: 'https://$kApiHost');
  return Dio(options);
}
