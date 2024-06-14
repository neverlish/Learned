import 'package:dio/dio.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'dio_provider.g.dart';

@riverpod
Dio dio(DioRef ref) {
  final options = BaseOptions(
    baseUrl: 'https://dummyjson.com',
  );
  return Dio(options);
}
