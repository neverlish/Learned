import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:state_notifier_provider/pages/todos_provider.dart';

class TodosPage extends ConsumerWidget {
  const TodosPage({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todosProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Todos'),
      ),
      body: Column(
        children: [
          const AddTodo(),
          const SizedBox(height: 20),
          Expanded(
            child: ListView(
              children: [
                for (final todo in todos)
                  CheckboxListTile(
                    controlAffinity: ListTileControlAffinity.leading,
                    value: todo.completed,
                    onChanged: (value) {
                      ref.read(todosProvider.notifier).toggleTodo(todo.id);
                    },
                    title: Text(todo.desc),
                    secondary: IconButton(
                      onPressed: () {
                        ref.read(todosProvider.notifier).removeTodo(todo.id);
                      },
                      icon: const Icon(Icons.delete),
                    ),
                  )
              ],
            ),
          )
        ],
      ),
    );
  }
}

class AddTodo extends ConsumerStatefulWidget {
  const AddTodo({super.key});

  @override
  _AddTodoState createState() => _AddTodoState();
}

class _AddTodoState extends ConsumerState<AddTodo> {
  final textController = TextEditingController();

  @override
  void dispose() {
    textController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: TextField(
        controller: textController,
        decoration: const InputDecoration(
          labelText: 'New Todo',
        ),
        onSubmitted: (desc) {
          if (desc.isNotEmpty) {
            ref.read(todosProvider.notifier).addTodo(desc);
            textController.clear();
          }
        },
      ),
    );
  }
}
