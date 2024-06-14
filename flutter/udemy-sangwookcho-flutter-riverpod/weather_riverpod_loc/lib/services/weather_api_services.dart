import 'package:dio/dio.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:weather_riverpod_loc/constants/constants.dart';
import 'package:weather_riverpod_loc/exceptions/weather_exception.dart';
import 'package:weather_riverpod_loc/models/current_weather/current_weather.dart';
import 'package:weather_riverpod_loc/models/direct_geocoding/direct_geocoding.dart';
import 'package:weather_riverpod_loc/services/dio_error_handler.dart';

class WeatherApiServices {
  final Dio dio;

  WeatherApiServices({required this.dio});

  Future<DirectGeocoding> getDirectGeocoding(String city) async {
    try {
      final Response response = await dio.get(
        '/geo/1.0/direct',
        queryParameters: {
          'q': city,
          'limit': kLimit,
          'appid': dotenv.env['APPID'],
        },
      );
      if (response.statusCode != 200) {
        throw dioErrorHandler(response);
      }
      if (response.data.isEmpty) {
        throw WeatherException('Cannot get the location of $city');
      }
      final directGeocoding = DirectGeocoding.fromJson(response.data[0]);
      return directGeocoding;
    } catch (e) {
      rethrow;
    }
  }

  Future<CurrentWeather> getWeather(DirectGeocoding directGeocoding) async {
    try {
      final Response response = await dio.get(
        '/data/2.5/weather',
        queryParameters: {
          'lat': '${directGeocoding.lat}',
          'lon': '${directGeocoding.lon}',
          'units': kUnits,
          'appid': dotenv.env['APPID'],
        },
      );
      if (response.statusCode != 200) {
        throw dioErrorHandler(response);
      }
      final currentWeather = CurrentWeather.fromJson(response.data);
      return currentWeather;
    } catch (e) {
      rethrow;
    }
  }
}
