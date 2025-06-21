import 'dart:async';

import 'package:fast_app_base/common/util/async/flutter_async.dart';
import 'package:flutter_animate/flutter_animate.dart';

void main() {
  // countStream(4).listen((value) {
  //   print(value);
  // });

  // final controller = StreamController<int>();

  // final stream = controller.stream;

  // stream.listen((value) {
  //   print(value);
  // });

  // countStream(4).map((event) => '$event 초가 지났습니다').listen((event) {
  //   print(event);
  // });

  // countStream(4).transform(utf8.decoder).listen((event) {
  //   print(event);
  // });

  // final broadcastStream = countStream(4).asBroadcastStream();

  // broadcastStream.listen((event) {
  //   print(event);
  // });

  // Future.delayed(2.seconds, () {
  //   broadcastStream.listen((event) {
  //     print('방송 2초 후: $event');
  //   });
  // });

  countStream(5).listen((event) {
    print(event);
  }, cancelOnError: false).onError((e, trace) {
    print(e.toString());
  });
}

void addDataToTheSink(StreamController<int> controller) async {
  for (int i = 1; i <= 4; i++) {
    print('before add sink');
    controller.sink.add(i);
    print('after add sink');
    await sleepAsync(2.seconds);
  }
}

Stream<int> countStream(int max) async* {
  for (int i = 1; i <= max; i++) {
    if (i == 2) {
      // throw Exception('에러 발생');
      yield* Stream.error(Exception('에러 발생'));
    } else {
      yield i;
    }
    // await sleepAsync(2.seconds);
    yield i;
  }
}
