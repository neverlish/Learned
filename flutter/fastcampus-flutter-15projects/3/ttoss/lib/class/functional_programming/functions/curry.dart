curry(Function f) => (a, {Iterable? args}) => (args?.length ?? 0) > 1 ? f(a, args) : (b) => f(a, b);

// main() {
//   print(curryMultiply(2)(3));
//   print(curryMultiply(3)(6));
// }
//
// final multiply = (int a, int b) => a * b;
//
// final curryMultiply = curry(multiply);
