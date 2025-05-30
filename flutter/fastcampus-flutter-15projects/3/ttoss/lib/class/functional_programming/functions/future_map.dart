futureMap<T, R>(Future<R> Function(T value) mappingFunction, List<T> next) async {
  final list = <R>[];
  for (final i in next) {
    R result = await mappingFunction(i);
    list.add(result);
  }
  return list;
}
