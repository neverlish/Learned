import '../error/iterable_element_error.dart';

Function reduce = <E>(E Function(E value, E element) combine, Iterable<E> iterable) {
  Iterator<E> iterator = iterable.iterator;
  if (!iterator.moveNext()) {
    throw IterableElementError.noElement();
  }
  E value = iterator.current;
  while (iterator.moveNext()) {
    value = combine(value, iterator.current);
  }
  return value;
};

// main() {
//   print(reduce<int>(add, [1, 2, 3]));
// }

// int add(int a, int b) => a + b;
