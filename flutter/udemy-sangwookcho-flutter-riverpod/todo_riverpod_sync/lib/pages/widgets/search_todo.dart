import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:todo_riverpod_sync/pages/providers/todo_search/todo_search_provider.dart';

class SearchTodo extends ConsumerWidget {
  const SearchTodo({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return TextField(
      decoration: const InputDecoration(
        hintText: 'Search todos..',
        border: InputBorder.none,
        filled: true,
        prefixIcon: Icon(Icons.search),
      ),
      onChanged: (String? newSearchTerm) {
        if (newSearchTerm != null) {
          ref.read(todoSearchProvider.notifier).setSearchTerm(newSearchTerm);
        }
      },
    );
  }
}
