import 'package:calendar_scheduler/const/colors.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class CustomTextField extends StatelessWidget {
  final String label;
  final bool isTime;

  const CustomTextField({
    super.key,
    required this.label,
    required this.isTime,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(color: PRIMARY_COLOR, fontWeight: FontWeight.w600),
        ),
        Expanded(
          flex: isTime ? 0 : 1,
          child: TextFormField(
              cursorColor: Colors.grey,
              maxLines: isTime ? 1 : null,
              expands: !isTime,
              keyboardType:
                  isTime ? TextInputType.number : TextInputType.multiline,
              inputFormatters: isTime
                  ? [
                      FilteringTextInputFormatter.digitsOnly,
                    ]
                  : [],
              decoration: InputDecoration(
                border: InputBorder.none,
                filled: true,
                fillColor: Colors.grey[300],
                suffixText: isTime ? '시' : null,
              )),
        ),
      ],
    );
  }
}
