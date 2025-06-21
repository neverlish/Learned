/// T : Result 타입 (또는 Return type 의미인 'R' 사용)
/// Params : 파라미터 타입

abstract interface class UseCase<T, Params> {
  Future<T> execute(Params params);
}

/// IO
/// I : Input
/// O : Output

// abstract interface class UseCase<Input, Output> {
//   Future<Output> execute(Input input);
// }
