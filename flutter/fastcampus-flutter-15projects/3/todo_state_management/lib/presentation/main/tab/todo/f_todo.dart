import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/presentation/main/tab/todo/w_todo_list.dart';
import 'package:flutter/material.dart';

class TodoFragment extends StatefulWidget {
  const TodoFragment({
    Key? key,
  }) : super(key: key);

  @override
  State<TodoFragment> createState() => _TodoFragmentState();
}

class _TodoFragmentState extends State<TodoFragment> {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: context.appColors.seedColor.getSwatchByBrightness(100),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            children: [
              IconButton(
                onPressed: () => openDrawer(context),
                icon: const Icon(Icons.menu),
              )
            ],
          ),
          Expanded(child: const TodoList().pSymmetric(h: 15)),
        ],
      ),
    );
  }

  void openDrawer(BuildContext context) {
    Scaffold.of(context).openDrawer();
  }
}
