import 'dart:io';

import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';

import 'package:testing_app/counter/main.dart' as app;

void main() {
  final binding = IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  group('end-to-end test', () {
    testWidgets('tap on the floating action button, verify counter', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      // Verify the counter starts at 0.
      expect(find.text('0'), findsOneWidget);

      // Finds the floating action button to tap on.
      final Finder fab = find.byTooltip('Increment');

      // Emulate a tap on the floating action button.
      await tester.tap(fab);

      // Trigger a frame.
      await tester.pumpAndSettle();

      // Verify the counter increments by 1.
      expect(find.text('1'), findsOneWidget);
    });
  });

  /// flutter drive --driver=integration_test/driver.dart --target=integration_test/counter_test.dart -d ${YOUR_DEVICE}
  /// import 주의: flutter/widgets.dart, flutter/foundation.dart 하면 안됨
  group('Screenshot Test', () {
    testWidgets('Increment', (tester) async {
      app.main();
      await tester.pumpAndSettle();

      final Finder fab = find.byTooltip('Increment');
      await tester.tap(fab);
      await tester.tap(fab);
      await tester.pumpAndSettle();

      await _takeScreenshot(tester, binding, 'screenshot_2');
    });
  });
}

Future<void> _takeScreenshot(
  WidgetTester tester,
  IntegrationTestWidgetsFlutterBinding binding,
  String fileName,
) async {
  if (Platform.isAndroid) {
    await binding.convertFlutterSurfaceToImage();
    await tester.pumpAndSettle();
  }

  await binding.takeScreenshot(fileName);
}
