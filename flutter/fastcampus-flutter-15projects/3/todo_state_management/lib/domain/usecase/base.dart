/// T : Result 타입
/// Params : 파라미터 타입

abstract interface class UseCase<T, Params> {
  Future<T> execute(Params params);
}
