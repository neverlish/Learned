const { range, interval } = require('rxjs');
const { scan, take, pluck } = require('rxjs/operators');

// scan 연산자의 초깃값을 0으로 설정한 예
range(0, 3).pipe(
  scan((accumulation, currentValue) => {
    console.log(`accumulation ${accumulation}, currentValue: ${currentValue}`);
    return accumulation + currentValue;
  }, 0)
).subscribe(result => console.log(`result ${result}`));
/*
accumulation 0, currentValue: 0
result 0
accumulation 0, currentValue: 1
result 1
accumulation 1, currentValue: 2
result 3
*/

// 초깃값으로 객체를 사용해 재고둑하는 피보나치 수열 예
const n = 7;
const source$ = interval(500).pipe(
  take(n),
  scan((accumulation, currentValue) => {
    const tempA = accumulation.a;
    accumulation.a = accumulation.b;
    accumulation.b = tempA + accumulation.b;
    return accumulation;
  }, { a: 1, b: 0 }),
  pluck('a')
);

source$.subscribe(result => console.log(`result1 ${result}`));
setTimeout(() =>
  source$.subscribe(result =>
    console.log(`result2 ${result}`)
  ), 3100
);
/*
result1 0
result1 1
result1 1
result1 2
result1 3
result1 5
result1 8
result2 13
result2 21
result2 34
result2 55
result2 89
result2 144
result2 233
*/

// 팩토리 함수를 이용해 초깃값 구분

const source2$ = interval(500).pipe(
  take(n),
  scan((accumulation, currentValue) => {
    let localAccumulation = accumulation;
    if (typeof localAccumulation === 'function') {
      localAccumulation = localAccumulation();
    }
    const tempA = localAccumulation.a;
    localAccumulation.a = localAccumulation.b;
    localAccumulation.b = tempA + localAccumulation.b;
    return localAccumulation;
  }, () => ({ a: 1, b: 0 })),
  pluck('a') 
);

source2$.subscribe(result => console.log(`result1 ${result}`));
setTimeout(() =>
  source2$.subscribe(result =>
    console.log(`result2 ${result}`)
  ), 3100
);
/*
result1 0
result1 1
result1 1
result1 2
result1 3
result1 5
result1 8
result2 0
result2 1
result2 1
result2 2
result2 3
result2 5
result2 8
*/

// 새 객체를 매번 생성ㅇ해 누적자 함수에 리턴하는 예
const source3$ = interval(500).pipe(
  take(n),
  scan((accumulation, currentValue) => ({
    a: accumulation.b,
    b: accumulation.a + accumulation.b
  }), { a: 1, b: 0 }),
  pluck('a')
);

source3$.subscribe(result => console.log(`result1 ${result}`));
setTimeout(() =>
  source3$.subscribe(result =>
    console.log(`result2 ${result}`)
  ), 3100
);
/*
result1 0
result1 1
result1 1
result1 2
result1 3
result1 5
result1 8
result2 0
result2 1
result2 1
result2 2
result2 3
result2 5
result2 8
*/
