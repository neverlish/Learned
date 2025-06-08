import 'package:flutter/foundation.dart';
import 'package:logging/logging.dart' as logging;

class Logger {
  final _log = logging.Logger('ExampleLogger');

  /// 1, 1, 2, 3, 5, 8, 13 ...
  int fibonacci(int n) {
    if (n <= 2) {
      if (n < 0) _log.shout('Unexpected negative n: $n');
      return 1;
    } else {
      _log.info('recursion: n = $n');
      return fibonacci(n - 2) + fibonacci(n - 1);
    }
  }

  /// Example of configuring a logger to print to stdout.
  ///
  /// This example will print:
  ///
  /// INFO: 2021-09-13 15:35:10.703401: recursion: n = 4
  /// INFO: 2021-09-13 15:35:10.707974: recursion: n = 3
  /// Fibonacci(4) is: 3
  /// Fibonacci(5) is: 5
  /// SHOUT: 2021-09-13 15:35:10.708087: Unexpected negative n: -42
  /// Fibonacci(-42) is: 1

  void demo() {
    logging.Logger.root.level = logging.Level.ALL; // defaults to Level.INFO
    logging.Logger.root.onRecord.listen((record) {
      debugPrint('${record.level.name}: ${record.time}: ${record.message}');
    });

    debugPrint('Fibonacci(4) is: ${fibonacci(4)}');

    logging.Logger.root.level = logging.Level.SEVERE; // skip logs less then severe.
    debugPrint('Fibonacci(5) is: ${fibonacci(5)}');

    debugPrint('Fibonacci(-42) is: ${fibonacci(-42)}');
  }
}


