import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';

import '../util/app_keyboard_util.dart';

_useShowKeyboard(BuildContext context, FocusNode node) {
  useMemoized(() {
    AppKeyboardUtil.show(context, node);
  });
}

showKeyboard(FocusNode node) {
  final context = useContext();
  _useShowKeyboard(context, node);
}
