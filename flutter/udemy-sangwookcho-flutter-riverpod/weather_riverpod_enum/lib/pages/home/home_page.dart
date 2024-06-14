import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:weather_riverpod_enum/constants/constants.dart';
import 'package:weather_riverpod_enum/models/current_weather/app_weather.dart';
import 'package:weather_riverpod_enum/pages/home/providers/theme_provider.dart';
import 'package:weather_riverpod_enum/pages/home/providers/theme_state.dart';
import 'package:weather_riverpod_enum/pages/home/providers/weather_provider.dart';
import 'package:weather_riverpod_enum/pages/home/providers/weather_state.dart';
import 'package:weather_riverpod_enum/pages/home/widgets/show_weather.dart';
import 'package:weather_riverpod_enum/pages/search/search_page.dart';
import 'package:weather_riverpod_enum/pages/temp_settings/temp_settings_page.dart';
import 'package:weather_riverpod_enum/pages/widgets/error_dialog.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  String? city;
  @override
  Widget build(BuildContext context) {
    ref.listen<WeatherState>(
      weatherProvider,
      (previous, next) {
        switch (next.status) {
          case WeatherStatus.failure:
            errorDialog(context, next.error!.errMsg);
          case WeatherStatus.success:
            final weather = AppWeather.fromCurrentWeather(next.currentWeather!);
            if (weather.temp < kWarmOrNot) {
              ref.read(themeProvider.notifier).changeTheme(const DarkTheme());
            } else {
              ref.read(themeProvider.notifier).changeTheme(const LightTheme());
            }
          case _:
        }
      },
    );

    final weatherState = ref.watch(weatherProvider);
    return Scaffold(
      appBar: AppBar(
        title: const Text('Weather'),
        actions: [
          IconButton(
            onPressed: () async {
              city = await Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => const SearchPage(),
                ),
              );
              print("city: $city");
              if (city != null) {
                ref.read(weatherProvider.notifier).fetchWeather(city!);
              }
            },
            icon: const Icon(Icons.search),
          ),
          IconButton(
            onPressed: () async {
              city = await Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => TempSettingsPage(),
                ),
              );
            },
            icon: const Icon(Icons.settings),
          )
        ],
      ),
      body: ShowWeather(weatherState: weatherState),
      floatingActionButton: FloatingActionButton(
        onPressed: city == null
            ? null
            : () {
                ref.read(weatherProvider.notifier).fetchWeather(city!);
              },
        child: const Icon(Icons.refresh),
      ),
    );
  }
}
