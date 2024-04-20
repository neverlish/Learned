import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todo_cubit/cubits/active_todo_count/active_todo_count_cubit.dart';

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
            ],
          ),
        ),
      )),
    );
  }
}

class TodoHeader extends StatelessWidget {
  const TodoHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        const Text(
          'TODO',
          style: TextStyle(fontSize: 40.0),
        ),
        // BlocBuilder<ActiveTodoCountCubit, ActiveTodoCountState>(
        //   builder: (context, state) {
        //     return Text(
        //       '${state.activeTodoCount} items left',
        //       style: const TextStyle(fontSize: 20.0, color: Colors.redAccent),
        //     );
        //   },
        // ),
        Text(
          '${context.watch<ActiveTodoCountCubit>().state.activeTodoCount} items left',
          style: const TextStyle(fontSize: 20.0, color: Colors.redAccent),
        ),
      ],
    );
  }
}
