import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/dart/extension/datetime_extension.dart';
import 'package:fast_app_base/common/data/memory/vo_todo.dart';
import 'package:fast_app_base/common/hooks/use_show_keyboard.dart';
import 'package:fast_app_base/common/widget/scaffold/bottom_dialog_scaffold.dart';
import 'package:fast_app_base/common/widget/w_round_button.dart';
import 'package:fast_app_base/screen/main/write/vo_write_todo_result.dart';
import 'package:flutter/material.dart';
import 'package:nav_hooks/dialog/hook_consumer_dialog.dart';

import '../../../common/widget/w_rounded_container.dart';

class WriteTodoDialog extends HookConsumerDialogWidget<WriteTodoResult> {
  final Todo? todoForEdit;

  WriteTodoDialog({this.todoForEdit, super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final selectedDate = useState<DateTime>(DateTime.now());
    final textController = useTextEditingController();
    final node = useFocusNode();

    useMemoized(() {
      if (todoForEdit != null) {
        selectedDate.value = todoForEdit!.dueDate;
        textController.text = todoForEdit!.title;
      }
    });


    showKeyboard(node);

    return BottomDialogScaffold(
      body: RoundedContainer(
          padding: const EdgeInsets.all(20),
          color: context.backgroundColor,
          child: Column(
            children: [
              Row(
                children: [
                  '할일을 작성해주세요.'.text.size(18).bold.make(),
                  spacer,
                  selectedDate.value.formattedDate.text.make(),
                  IconButton(
                      onPressed: () => _selectDate(context, selectedDate),
                      icon: const Icon(Icons.calendar_month))
                ],
              ),
              height20,
              Row(
                children: [
                  Expanded(
                      child: TextField(
                    focusNode: node,
                    controller: textController,
                  )),
                  RoundButton(
                      text: isEditMode ? '완료' : '추가',
                      onTap: () {
                        hide(WriteTodoResult(
                            selectedDate.value, textController.text));
                      }),
                ],
              ),
            ],
          )),
    );
  }

  bool get isEditMode => todoForEdit != null;

  void _selectDate(
      BuildContext context, ValueNotifier<DateTime> selectedDate) async {
    final date = await showDatePicker(
      context: context,
      initialDate: selectedDate.value,
      firstDate: DateTime.now().subtract(const Duration(days: 365)),
      lastDate: DateTime.now().add(const Duration(days: 365 * 10)),
    );

    if (date != null) {
      selectedDate.value = date;
    }
  }
}
