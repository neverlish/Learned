import 'package:dio/dio.dart';

String dioErrorHandler(Response response) {
  final statusCode = response.statusCode;
  final statusMessage = response.statusMessage;

  final String errorMessage =
      'Request failed\n\nStatus Code: $statusCode\nSReason: $statusMessage';

  return errorMessage;
}
