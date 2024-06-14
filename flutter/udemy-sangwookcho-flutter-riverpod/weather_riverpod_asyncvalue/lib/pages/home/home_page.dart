import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:weather_riverpod_asyncvalue/extensions/async_value_xx.dart';
import 'package:weather_riverpod_asyncvalue/pages/home/providers/weather_provider.dart';
import 'package:weather_riverpod_asyncvalue/pages/search/search_page.dart';

class HomePage extends ConsumerStatefulWidget {
  const HomePage({super.key});

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomePageState();
}

class _HomePageState extends ConsumerState<HomePage> {
  String? city;
  @override
  Widget build(BuildContext context) {
    final weatherState = ref.watch(weatherProvider);
    print(weatherState.toStr);
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
          )
        ],
      ),
      body: const Center(
        child: Text('Home'),
      ),
    );
  }
}
