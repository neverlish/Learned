const co = require('co');

// co 라이브러리 사용 예
//// 임의의 비동기 작업을 시뮬레이션 하는 함수
function makeAsync(text, ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(text), ms);
  });
}

//// doAsync 함수 대신 co 라이브러리 사용
co(function*() {
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

async function someAsync() {
  const foo = await makeAsync('foo', 1000);
  console.log(foo); // foo

  const bar = await makeAsync('bar', 1000);
  console.log(bar); // foo

  const baz = await makeAsync('baz', 1000);
  console.log(baz); // foo

  console.log('completed');
}
someAsync();
/*
foo
bar
baz
completed
*/
