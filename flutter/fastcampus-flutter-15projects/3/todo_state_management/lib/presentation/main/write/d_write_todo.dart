import 'package:after_layout/after_layout.dart';
import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/dart/extension/datetime_extension.dart';
import 'package:fast_app_base/common/util/app_keyboard_util.dart';
import 'package:fast_app_base/presentation/widget/bottom_dialog_scaffold.dart';
import 'package:fast_app_base/presentation/widget/w_round_button.dart';
import 'package:fast_app_base/common/util/simple_result.dart';
import 'package:fast_app_base/domain/domain.dart';
import 'package:flutter/material.dart';
import 'package:nav/dialog/dialog.dart';
import 'package:nav/enum/enum_nav_ani.dart';

class WriteTodoBottomSheet extends DialogWidget<SimpleResult<TodoWriteResult, void>> {
  final Todo? todoForEdit;

  WriteTodoBottomSheet({
    super.context,
    super.key,
    super.barrierColor = const Color(0x80000000),
    super.animation = NavAni.Bottom,
    super.useRootNavigator = false,
    this.todoForEdit,
  });

  @override
  State<StatefulWidget> createState() => _WriteTodoBottomSheetState();
}

class _WriteTodoBottomSheetState extends DialogState<WriteTodoBottomSheet> with AfterLayoutMixin {
  final todoTextEditingController = TextEditingController();
  final node = FocusNode();
  late DateTime _selectedDate;
  bool showRedTextLine = false;

  @override
  void initState() {
    final todoForEdit = widget.todoForEdit;
    if (todoForEdit != null) {
      _selectedDate = todoForEdit.dueDate;
      todoTextEditingController.text = todoForEdit.title;
    } else {
      _selectedDate = DateTime.now();
    }
    super.initState();
  }

  @override
  FutureOr<void> afterFirstLayout(BuildContext context) {
    AppKeyboardUtil.show(context, node);
  }

  @override
  Widget build(BuildContext context) {
    return BottomDialogScaffold(
      body: Column(
        children: [
          Row(
            children: [
              '할일을 작성해주세요.'.text.size(18).bold.make(),
              emptyExpanded,
              Tap(
                onTap: onTapChangedDate,
                child: _selectedDate.formattedDate.text.make(),
              ),
              IconButton(
                padding: const EdgeInsets.all(15),
                onPressed: onTapChangedDate,
                icon: const Icon(Icons.calendar_month),
              ),
            ],
          ),
          const Height(20),
          Row(
            children: [
              Expanded(
                child: TextField(
                  focusNode: node,
                  controller: todoTextEditingController,
                  decoration: InputDecoration(
                    focusedBorder: !showRedTextLine
                        ? null
                        : const UnderlineInputBorder(
                            borderSide: BorderSide(color: Colors.red, width: 3),
                          ),
                  ),
                  onEditingComplete: () => done(context),
                ),
              ),
              RoundButton(
                  text: isEditMode ? '수정' : '추가',
                  onTap: () {
                    done(context);
                  })
            ],
          )
        ],
      ),
    );
  }

  bool get isEditMode => widget.todoForEdit != null;

  void onTapChangedDate() async {
    final selectedDate = await showDatePicker(
        context: context,
        helpText: '목표일을 선택해주세요.',
        initialDate: _selectedDate,
        firstDate: DateTime.now().subtract(const Duration(days: 365)),
        lastDate: DateTime.now().add(const Duration(days: 365 * 10)));
    if (selectedDate != null) {
      setState(() {
        _selectedDate = selectedDate;
      });
    }
  }

  void done(BuildContext context) {
    if (todoTextEditingController.text.trim().isEmpty) {
      setState(() {
        showRedTextLine = true;
      });
      return;
    }

    widget.hide(SimpleResult.success(TodoWriteResult(title: todoTextEditingController.text, dueDate: _selectedDate)));
  }
}
