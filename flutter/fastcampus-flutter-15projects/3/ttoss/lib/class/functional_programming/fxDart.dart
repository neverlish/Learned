import 'functions/reduce.dart';

export 'functions/future_map.dart';
export 'functions/map.dart';
export 'functions/reduce.dart';
export 'functions/run.dart';

fxDart(List args) async {
  return await reduce((a, f) async {
    if (a is Future) {
      return f(await a);
    }
    return f(a);
  }, args);
}
