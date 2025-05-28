import 'package:fast_app_base/common/common.dart';
import 'package:fast_app_base/common/widget/w_arrow.dart';
import 'package:flutter/material.dart';

class LongButton extends StatelessWidget {
  final String title;
  final VoidCallback? onTap;
  const LongButton({super.key, required this.title, this.onTap});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 15),
      child: Row(
        children: [
          title.text.make(),
          emptyExpanded,
          Arrow(
            color: context.appColors.lessImportant,
          )
        ],
      ),
    );
  }
}
