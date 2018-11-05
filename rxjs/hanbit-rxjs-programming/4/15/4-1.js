const { from, merge, interval } = require('rxjs');
const { toArray } = require('rxjs/operators');

// toPromise 함수 사용 예
function getPromise(val) {
  return new Promise(resolve => resolve(val));
}

(async function() {
  const list = await merge(
    from(getPromise('foo')),
    from(getPromise('bar')),
    from(getPromise('baz'))
  ).pipe(toArray()).toPromise(); // await를 사용하려고 프로미스로 변환
  console.log(list);
})(); // [ 'foo', 'bar', 'baz' ]

// await 키워드를 사용한 코드가 실행되지 않는 문제
(async function() {
  const list = await interval(100).pipe(toArray()).toPromise();
  // 영원히 호출되지 않는다.
  console.log(list);
})();
