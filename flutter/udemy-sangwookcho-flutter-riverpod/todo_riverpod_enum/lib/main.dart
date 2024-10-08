import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_enum/pages/providers/theme/theme_provider.dart';
import 'package:todo_riverpod_enum/repositories/fake_todos_repository.dart';
import 'package:todo_riverpod_enum/repositories/providers/todos_repository_provider.dart';

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
      theme: currentTheme == AppTheme.light
          ? ThemeData.light(useMaterial3: true)
          : ThemeData.dark(useMaterial3: true),
      home: const TodosPage(),
    );
  }
}
