import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

import '../common.dart';

class ThemeUtil {
  static Brightness get systemBrightness =>
      SchedulerBinding.instance.platformDispatcher.platformBrightness;
}
