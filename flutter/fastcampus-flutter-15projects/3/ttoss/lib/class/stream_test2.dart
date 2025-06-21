import 'dart:io';

import 'package:flutter_animate/flutter_animate.dart';

void main() async {
  final List list = ['blue', 'yellow', 'red'];

  final iterator = list.iterator;

  // print(iterator.current);
  // // iterator.moveNext();
  // // print(iterator.current);

  // while (iterator.moveNext()) {
  //   print(iterator.current);
  // }

  // list.forEach((element) {

  // });

  // for (var element in list) {
  //   print(element);
  // }

  // for (final message in countIterable(5)) {
  //   print(message);
  // }

  await for (final message in countStream(5)) {
    print(message);
  }
}

Iterable<String> countIterable(int max) sync* {
  for (int i = 1; i <= max; i++) {
    yield i.toString();
  }
  yield '새해복 많이 받으세요';

  // yield* ['1', '2', '3', '4'];
  yield* countIterable(max);
}

Stream<String> countStream(int to) async* {
  for (int i = 1; i <= to; i++) {
    sleep(1.seconds);
    yield i.toString();
  }
  yield '새해복 많이 받으세요';
  yield* countStream(to);
}
