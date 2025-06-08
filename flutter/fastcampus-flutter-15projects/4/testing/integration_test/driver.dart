// Copyright 2020 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// import 'package:integration_test/integration_test_driver.dart';
import 'dart:io';

import 'package:integration_test/integration_test_driver_extended.dart';

// ignore_for_file: avoid_print

/// as-is
// Future<void> main() => integrationDriver();

/// to-be
Future<void> main() async {
  try {
    await integrationDriver(
      onScreenshot: (name, image, [args]) async {
        print('onScreenshot');
        final File imageFile = await File('screenshots/$name.png').create(recursive: true);

        await imageFile.writeAsBytes(image);
        print('file writeAsBytes');

        return true;
      },
    );
  } catch (e, s) {
    print('$e');
    print('$s');
  }
}
