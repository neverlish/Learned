// 제너레이터 함수를 인자료 사용한 예
//// 임의의 비동기 작업을 시뮬레이션 하는 함수
function makeAsync(text, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(text), ms);
  });
}

// doAsync 함수를 포함한 전체 구조
function doAsync(generator) {
  const iterator = generator();
  function asyncFlow(result) {
    const { value, done } = iterator.next(result);
    if (done) {
      return value;
    } else {
      if (value instanceof Promise) {
        return value.then(val => asyncFlow(val));
      } else {
        return asyncFlow(value);
      }
    }
  }
  asyncFlow(iterator);
}

//// 비동기 로직인데 마치 동기 로직처럼 다룬다.
doAsync(function*() {
  const foo = yield makeAsync('foo', 1000);
  console.log(foo); // foo

  const bar = yield makeAsync('bar', 1000);
  console.log(bar); // foo

  const baz = yield makeAsync('baz', 1000);
  console.log(baz); // foo

  console.log('completed');
});
/*
foo
bar
baz
completed
*/
