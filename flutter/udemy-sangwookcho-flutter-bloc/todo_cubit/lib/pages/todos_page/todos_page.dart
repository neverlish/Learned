import 'package:flutter/material.dart';
import 'package:todo_cubit/pages/todos_page/create_todo.dart';
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
            ],
          ),
        ),
      )),
    );
  }
}
