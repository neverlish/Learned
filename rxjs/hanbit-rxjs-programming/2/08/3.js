const { interval } = require('rxjs');
const { take, tap } = require('rxjs/operators');

// toPromise 함수의 사용 예
interval(100).pipe(
  take(10),
  tap(x => console.log(`interval tap ${x}`))
).toPromise().then(
  value => console.log(`프로미스 결과 ${value}`),
  reason => console.error(`프로미스 에러 ${reason}`)
);
/*
interval tap 0
interval tap 1
interval tap 2
interval tap 3
interval tap 4
interval tap 5
interval tap 6
interval tap 7
interval tap 8
interval tap 9
프로미스 결과 9
*/
