const { range } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

// mergeMap 연산자에 배열 사용
range(0, 3).pipe(mergeMap(x => [x + 1, x + 2, x + 3, x + 4]))
  .subscribe(value => console.log(`current value: ${value}`));
/*
current value: 1
current value: 2
current value: 3
current value: 4
current value: 2
current value: 3
current value: 4
current value: 5
current value: 3
current value: 4
current value: 5
current value: 6
*/

// 유사 배열(ArrayLike)을 배열처럼 취급

range(0, 3).pipe(mergeMap(x => {
  const nextArrayLike = {
    length: 4,
    0: x + 1,
    1: x + 2,
    2: x + 3,
    3: x + 4
  };
  console.log(`typeof nextArrayLike: ${typeof nextArrayLike}`);
  return nextArrayLike;
})).subscribe(value => console.log(`current value: ${value}`));
/*
typeof nextArrayLike: object
current value: 1
current value: 2
current value: 3
current value: 4
typeof nextArrayLike: object
current value: 2
current value: 3
current value: 4
current value: 5
typeof nextArrayLike: object
current value: 3
current value: 4
current value: 5
current value: 6
*/

// mergeMap 연산자의 프로미스의 생성과 사용 예
range(0, 3).pipe(mergeMap(x => 
  new Promise(
    resolve => setTimeout(
      () => resolve(`req${x + 1}`), 
      Math.floor(Math.random() * 2000)
    )
  ))
).subscribe(req => console.log(`response from ${req}`));
/*
response from req1
response from req3
response from req2
(매번 순서 달라짐)
*/

// mergeMap 연산자에 이터러블 사용 예
range(0, 3).pipe(mergeMap(x => {
  const nextMap = new Map();
  nextMap.set('original', x);
  nextMap.set('plusOne', x + 1);
  return nextMap;
})).subscribe(entry => {
  const [key, value] = entry;
  console.log(`key is ${key}, value is ${value}`);
});
/*
key is original, value is 0
key is plusOne, value is 1
key is original, value is 1
key is plusOne, value is 2
key is original, value is 2
key is plusOne, value is 3
*/
