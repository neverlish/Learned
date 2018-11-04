const { from } = require('rxjs');
const { map } = require('rxjs/operators');

function time(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// next 콜백 함수 안 async와 await 키워드 사용
from([1, 2, 3]).pipe(map(x => time(x * 1000)))
  .subscribe(async delayPromise => {
    const startTime = Date.now();
    await delayPromise; // 1초 2초 3초 대
    const delayTime = Date.now() - startTime;
    console.log(delayTime + 'ms 기다림');
  });
/*
1003ms 기다림
2001ms 기다림
3003ms 기다림
*/
