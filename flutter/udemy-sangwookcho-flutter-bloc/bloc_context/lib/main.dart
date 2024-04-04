import 'package:bloc_context/cubits/counter/counter_cubit.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'MyCounter Cubit',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int incrementSize = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: BlocProvider(
          create: (BuildContext _) => CounterCubit(),
          child: Builder(builder: (context) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  '${BlocProvider.of<CounterCubit>(context, listen: true).state.counter}',
                  style: const TextStyle(fontSize: 52.0),
                ),
                ElevatedButton(
                  child: const Text(
                    'Increment',
                    style: TextStyle(fontSize: 20.0),
                  ),
                  onPressed: () {
                    BlocProvider.of<CounterCubit>(context).increment();
                  },
                ),
              ],
            );
          }),
        ),
      ),
    );
  }
}
