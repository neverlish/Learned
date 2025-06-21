// Copyright 2020 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'package:test/test.dart';

class Counter {
  static const int maxValue = 10;
  int value = 0;

  void increment() {
    if (value >= maxValue) return;

    value++;
  }

  void decrement() => value--;
}

void main() {
  /// Single
  test('Counter value should be incremented', () {
    final counter = Counter();

    counter.increment();

    expect(counter.value, 1);
  });

  test('Counter value should be incremented', () {
    final counter = Counter();

    for (int index = 0; index < Counter.maxValue; index++) {
      counter.increment();
    }

    counter.increment();

    expect(counter.value, 10);
  });

  /// Group
  group('Counter', () {
    test('value should start at 0', () {
      expect(Counter().value, 0);
    });

    test('value should be incremented', () {
      final counter = Counter();

      counter.increment();

      expect(counter.value, 1);
    });

    test('value should be decremented', () {
      final counter = Counter();

      counter.decrement();

      expect(counter.value, -1);
    });
  });
}
