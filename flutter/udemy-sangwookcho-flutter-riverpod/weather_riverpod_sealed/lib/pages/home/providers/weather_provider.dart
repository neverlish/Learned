import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:weather_riverpod_sealed/models/custom_error/custom_error.dart';
import 'package:weather_riverpod_sealed/pages/home/providers/weather_state.dart';
import 'package:weather_riverpod_sealed/repositories/providers/weather_repository_provider.dart';

part 'weather_provider.g.dart';

@riverpod
class Weather extends _$Weather {
  @override
  WeatherState build() {
    return const WeatherStateInitial();
  }

  Future<void> fetchWeather(String city) async {
    state = const WeatherStateLoading();

    try {
      final currentWeather =
          await ref.read(weatherRepositoryProvider).fetchWeather(city);

      state = WeatherStateSuccess(currentWeather: currentWeather);
    } on CustomError catch (error) {
      state = WeatherStateFailure(error: error);
    }
  }
}
