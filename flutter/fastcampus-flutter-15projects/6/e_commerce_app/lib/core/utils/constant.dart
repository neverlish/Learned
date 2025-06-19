import 'package:flutter/material.dart';

class Constants {
  static EdgeInsets get horizontalPadding =>
      const EdgeInsets.symmetric(horizontal: 16);
}


enum MallType { market, beauty }

enum Status { initial, loading, success, error }
