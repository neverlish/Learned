import 'package:logger/logger.dart' as logger;

class Logger {
  final _log = logger.Logger(
    printer: logger.PrettyPrinter(),
  );

  final _loggerNoStack = logger.Logger(
    printer: logger.PrettyPrinter(methodCount: 0),
  );

  void demo() {
    _log.d('Log message with 2 methods');

    _loggerNoStack.i('Info message');

    _loggerNoStack.w('Just a warning!');

    _log.e('Error! Something bad happened', 'Test Error');

    _loggerNoStack.v({'key': 5, 'value': 'something'});

    logger.Logger(printer: logger.SimplePrinter(colors: true)).v('boom');
  }
}
