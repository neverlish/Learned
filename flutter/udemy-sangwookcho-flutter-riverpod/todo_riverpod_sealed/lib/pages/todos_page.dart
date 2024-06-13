import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:todo_riverpod_sealed/pages/widgets/filter_todo.dart';
import 'package:todo_riverpod_sealed/pages/widgets/new_todo.dart';
import 'package:todo_riverpod_sealed/pages/widgets/search_todo.dart';
import 'package:todo_riverpod_sealed/pages/widgets/show_todos.dart';
import 'package:todo_riverpod_sealed/pages/widgets/todo_header.dart';

import 'package:loader_overlay/loader_overlay.dart';

class TodosPage extends StatelessWidget {
  const TodosPage({super.key});

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Scaffold(
        body: LoaderOverlay(
          useDefaultLoading: false,
          overlayWidget: Center(
            child: SpinKitFadingCircle(
              color: Colors.grey,
            ),
          ),
          child: Padding(
            padding: EdgeInsets.all(20.0),
            child: Column(
              children: [
                TodoHeader(),
                NewTodo(),
                SizedBox(height: 20),
                SearchTodo(),
                SizedBox(height: 10),
                FilterTodo(),
                SizedBox(height: 10),
                Expanded(
                  child: ShowTodos(),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
