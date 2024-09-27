import 'dart:convert';
import 'dart:io';

import 'package:dio/dio.dart';

class AuthRepository {
  final _dio = Dio();
  final _targetUrl =
      'http://${Platform.isAndroid ? '10.0.2.2' : 'localhost'}:3000/auth';

  Future<({String refreshToken, String accessToken})> register({
    required String email,
    required String password,
  }) async {
    final result = await _dio.post(
      '$_targetUrl/register/email',
      data: {
        'email': email,
        'password': password,
      },
    );

    return (
      refreshToken: result.data['refreshToken'] as String,
      accessToken: result.data['accessToken'] as String
    );
  }

  Future<({String refreshToken, String accessToken})> login({
    required String email,
    required String password,
  }) async {
    final emailAndPasssword = '$email:$password';
    Codec<String, String> stringToBase64 = utf8.fuse(base64);
    final encoded = stringToBase64.encode(emailAndPasssword);

    final result = await _dio.post('$_targetUrl/login/email',
        options: Options(headers: {'authorization': 'Basic $encoded'}));

    return (
      refreshToken: result.data['refreshToken'] as String,
      accessToken: result.data['accessToken'] as String
    );
  }

  Future<String> rotateRefreshToken({required String refreshToken}) async {
    final result = await _dio.post(
      '$_targetUrl/token/refresh',
      options: Options(
        headers: {'authorization': 'Bearer $refreshToken'},
      ),
    );

    return result.data['refreshToken'] as String;
  }

  Future<String> rotateAccessToken({
    required String refreshToken,
  }) async {
    final result = await _dio.post(
      '$_targetUrl/token/access',
      options: Options(
        headers: {
          'authorization': 'Bearer $refreshToken',
        },
      ),
    );

    return result.data['accessToken'] as String;
  }
}
