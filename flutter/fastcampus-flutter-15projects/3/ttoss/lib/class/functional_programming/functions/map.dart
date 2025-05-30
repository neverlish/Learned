map<T, R>(R Function(T value) mappingFunction, List<T> next) {
  final list = <R>[];
  for (final i in next) {
    list.add(mappingFunction(i));
  }
  return list;
}
