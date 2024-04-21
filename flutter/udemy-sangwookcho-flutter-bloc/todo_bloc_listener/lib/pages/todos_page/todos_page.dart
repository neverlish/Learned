import 'package:flutter/material.dart';
import 'package:todo_bloc_listener/pages/todos_page/create_todo.dart';
import 'package:todo_bloc_listener/pages/todos_page/search_and_filter_todo.dart';
import 'package:todo_bloc_listener/pages/todos_page/show_todos.dart';
import 'todo_header.dart';

class TodosPage extends StatelessWidget {
  const TodosPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const SafeArea(
      child: Scaffold(
          body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: 20.0,
            vertical: 40.0,
          ),
          child: Column(
            children: [
              TodoHeader(),
              CreateTodo(),
              SizedBox(height: 20),
              SearchAndFilterTodo(),
              ShowTodos(),
            ],
          ),
        ),
      )),
    );
  }
}
