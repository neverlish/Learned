import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_asyncvalue/pages/providers/theme/theme_provider.dart';
import 'package:todo_riverpod_asyncvalue/pages/providers/theme/theme_state.dart';
import 'package:todo_riverpod_asyncvalue/repositories/fake_todos_repository.dart';
import 'package:todo_riverpod_asyncvalue/repositories/providers/todos_repository_provider.dart';

import 'pages/todos_page.dart';

void main() {
  runApp(
    ProviderScope(
      overrides: [
        todosRepositoryProvider.overrideWithValue(FakeTodosRepository())
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends ConsumerWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final currentTheme = ref.watch(themeProvider);
    return MaterialApp(
      title: 'Todos',
      debugShowCheckedModeBanner: false,
      theme: switch (currentTheme) {
        LightTheme() => ThemeData.light(useMaterial3: true),
        DarkTheme() => ThemeData.dark(useMaterial3: true),
      },
      home: const TodosPage(),
    );
  }
}
