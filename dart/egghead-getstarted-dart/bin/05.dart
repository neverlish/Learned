// 05 Understand Variables and Constants in Dart

void main() {
  var a = 1;
  print(a);

  int b = 2;
  print(b);

  final c = 'Hello';
  // c = 'Hello again'; Error: Setter not found: 'c'.
  print(c);

  const d = 'World'; // Number, String, Boolean, Array, Map, Symbol, const T
  print(d);
}
