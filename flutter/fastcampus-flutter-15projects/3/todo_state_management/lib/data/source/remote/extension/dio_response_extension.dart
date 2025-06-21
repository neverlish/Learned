import 'package:dio/dio.dart';

extension ReponseExtension on Response {
  bool get isSuccessCode => statusCode != null && statusCode! >= 200 && statusCode! < 300;
}
