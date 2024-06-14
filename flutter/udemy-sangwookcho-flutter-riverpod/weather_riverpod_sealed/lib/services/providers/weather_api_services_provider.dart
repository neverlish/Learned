import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:weather_riverpod_sealed/services/providers/dio_provider.dart';
import 'package:weather_riverpod_sealed/services/weather_api_services.dart';

part 'weather_api_services_provider.g.dart';

@riverpod
WeatherApiServices weatherApiServices(WeatherApiServicesRef ref) {
  return WeatherApiServices(dio: ref.watch(dioProvider));
}
