import 'package:equatable/equatable.dart';

class Weather extends Equatable {
  final String description;
  final String icon;
  final double temp;
  final double tempMin;
  final double tempMax;
  final String name;
  final String country;
  final DateTime lastUpdated;

  const Weather({
    required this.description,
    required this.icon,
    required this.temp,
    required this.tempMin,
    required this.tempMax,
    required this.name,
    required this.country,
    required this.lastUpdated,
  });

  factory Weather.fromJson(Map<String, dynamic> json) {
    final weather = json['weather'][0];
    final main = json['main'];

    return Weather(
      description: weather['description'],
      icon: weather['icon'],
      temp: main['temp'],
      tempMin: main['temp_min'],
      tempMax: main['temp_max'],
      name: '',
      country: '',
      lastUpdated: DateTime.now(),
    );
  }

  @override
  List<Object> get props {
    return [
      description,
      icon,
      temp,
      tempMin,
      tempMax,
      name,
      country,
      lastUpdated,
    ];
  }

  @override
  String toString() {
    return '''Weather(
      description: $description, 
      icon: $icon, 
      temp: $temp, 
      tempMin: $tempMin, 
      tempMax: $tempMax, 
      name: $name, 
      country: $country, 
      lastUpdated: $lastUpdated
    )''';
  }
}
