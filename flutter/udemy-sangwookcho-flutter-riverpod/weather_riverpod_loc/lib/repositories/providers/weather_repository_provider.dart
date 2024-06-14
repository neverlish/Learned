import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:weather_riverpod_loc/repositories/weather_repository.dart';
import 'package:weather_riverpod_loc/services/providers/weather_api_services_provider.dart';

part 'weather_repository_provider.g.dart';

@riverpod
WeatherRepository weatherRepository(WeatherRepositoryRef ref) {
  return WeatherRepository(
    weatherApiServices: ref.watch(weatherApiServicesProvider),
  );
}
