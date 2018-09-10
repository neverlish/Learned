// 09-2-4 네버 타입 - 오류 발생 시 네버 타입을 적용

function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error('error!!!');
}

fail();
