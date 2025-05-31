import 'dart:io';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

import '../../../common/common.dart';
import '../../simple_result.dart';

enum NetworkErrorType {
  networkConnectionError,
  serviceError,
}

class ApiError {
  int? statusCode;
  bool isApplicationError;
  String message;
  NetworkErrorType networkErrorType;

  ApiError({
    this.statusCode,
    this.isApplicationError = false,
    required this.message,
    this.networkErrorType = NetworkErrorType.serviceError,
  });

  static createErrorResult(e) {
    if (e is DioException) {
      if (e.error is SocketException) {
        return SimpleResult.failure(ApiError(
            message: '통신상태를 확인해주세요.',
            networkErrorType: NetworkErrorType.networkConnectionError));
      }

      if (!kReleaseMode) {
        return SimpleResult.failure(ApiError(
            message: e.error?.toString() ?? e.message ?? 'message is empty',
            isApplicationError: e.response == null));
      } else {
        return SimpleResult.failure(ApiError(
            message: 'apiError'.tr(), statusCode: e.response?.statusCode));
      }
    }
    return SimpleResult.failure(ApiError(message: 'apiError'.tr()));
  }
}
