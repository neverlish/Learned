import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../cubits/weather/weather_cubit.dart';
import 'search_page.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String? _city;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Weather'),
        actions: [
          IconButton(
            onPressed: () async {
              // to avoid async gap warning
              final weatherCubit = context.read<WeatherCubit>();

              _city = await Navigator.push(
                context,
                MaterialPageRoute(builder: (context) {
                  return const SearchPage();
                }),
              );
              print('city: $_city');
              if (_city != null) {
                weatherCubit.fetchWeather(_city!);
              }
            },
            icon: const Icon(Icons.search),
          ),
        ],
      ),
      body: _showWeather(),
    );
  }

  Widget _showWeather() {
    return BlocConsumer<WeatherCubit, WeatherState>(
      listener: (context, state) {
        if (state.status == WeatherStatus.error) {
          showDialog(
            context: context,
            builder: (context) {
              return AlertDialog(
                content: Text(state.error.errMsg),
              );
            },
          );
        }
      },
      builder: (context, state) {
        if (state.status == WeatherStatus.initial) {
          return const Center(
            child: Text(
              'Select a city',
              style: TextStyle(fontSize: 20.0),
            ),
          );
        }

        if (state.status == WeatherStatus.loading) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }

        if (state.status == WeatherStatus.error && state.weather.name == '') {
          return const Center(
            child: Text(
              'Select a city',
              style: TextStyle(fontSize: 20.0),
            ),
          );
        }

        return Center(
          child: Text(
            state.weather.name,
            style: const TextStyle(fontSize: 18.0),
          ),
        );
      },
    );
  }
}
