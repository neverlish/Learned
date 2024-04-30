part of 'weather_bloc.dart';

sealed class WeatherEvent extends Equatable {
  const WeatherEvent();

  @override
  List<Object> get props => [];
}

final class FetchWeatherEvent extends WeatherEvent {
  const FetchWeatherEvent({
    required this.city,
  });

  final String city;

  @override
  List<Object> get props => [city];
}
