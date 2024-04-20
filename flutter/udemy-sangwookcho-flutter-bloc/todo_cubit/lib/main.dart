import 'package:flutter/material.dart';
import 'package:todo_cubit/cubits/cubits.dart';

import 'pages/todos_page.dart';

import 'package:flutter_bloc/flutter_bloc.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider<TodoFilterCubit>(
          create: (BuildContext context) => TodoFilterCubit(),
        ),
        BlocProvider<TodoSearchCubit>(
          create: (BuildContext context) => TodoSearchCubit(),
        ),
        BlocProvider<TodoListCubit>(
          create: (BuildContext context) => TodoListCubit(),
        ),
        BlocProvider<ActiveTodoCountCubit>(
          create: (BuildContext context) => ActiveTodoCountCubit(
            todoListCubit: context.read<TodoListCubit>(),
          ),
        ),
        BlocProvider<FilteredTodosCubit>(
          create: (BuildContext context) => FilteredTodosCubit(
            todoFilterCubit: context.read<TodoFilterCubit>(),
            todoSearchCubit: context.read<TodoSearchCubit>(),
            todoListCubit: context.read<TodoListCubit>(),
          ),
        ),
      ],
      child: MaterialApp(
        title: 'TODO',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const TodosPage(),
      ),
    );
  }
}
