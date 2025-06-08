// ignore: depend_on_referenced_packages
import 'package:http/http.dart';

extension ReponseExtension on Response {
  bool get isSuccessCode => statusCode >= 200 && statusCode < 300;
}
