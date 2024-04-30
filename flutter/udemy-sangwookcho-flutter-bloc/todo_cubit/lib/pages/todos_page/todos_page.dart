import 'package:flutter/material.dart';
import 'package:todo_cubit/pages/todos_page/create_todo.dart';
import 'package:todo_cubit/pages/todos_page/search_and_filter_todo.dart';
import 'package:todo_cubit/pages/todos_page/show_todos.dart';
import 'todo_header.dart';

class TodosPage extends StatelessWidget {
  const TodosPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(
            horizontal: 20.0,
            vertical: 40.0,
          ),
          child: Column(
            children: [
              const TodoHeader(),
              const CreateTodo(),
              const SizedBox(height: 20),
              SearchAndFilterTodo(),
              const ShowTodos(),
            ],
          ),
        ),
      )),
    );
  }
}
