abstract class IterableElementError {
  /// Error thrown thrown by, e.g., [Iterable.first] when there is no result. */
  static StateError noElement() => StateError("No element");

  /// Error thrown by, e.g., [Iterable.single] if there are too many results. */
  static StateError tooMany() => StateError("Too many elements");

  /// Error thrown by, e.g., [List.setRange] if there are too few elements. */
  static StateError tooFew() => StateError("Too few elements");
}
