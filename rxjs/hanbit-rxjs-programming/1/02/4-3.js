const { Observable } = require('rxjs');
const { map, toArray } = require('rxjs/operators');

// 옵저버블을 생성하고 변환 연산자 적용
const observableCreated$ = Observable.create(function(observer) {
  observer.next(1);
  observer.next(2);
  observer.complete();
});

observableCreated$.pipe(
  map(function(value) {
    return value * 2;
  })
).subscribe(function next(item) {
  console.log(item);
});

/*
2
4
*/

console.log([1, 2]
  .map(function(value) {
    return value * 2;
  })
  .map(function(value) {
    return value + 1;
  })
  .map(function(value) {
    return value * 3;
  })
); // [ 9, 15 ]

// 옵저버블에서 map 연산자를 여러 번 호출

const observableCreated2$ = Observable.create(function(observer) {
  console.log('Observable BEGIN');
  const arr = [1, 2];
  for (let i = 0; i < arr.length; i++) {
    console.log(`current array: arr[${i}]`);
    observer.next(arr[i]);
  }
  console.log('BEFORE complete');
  observer.complete();
  console.log('Observable END');
});

function logAndGet(original, value) {
  console.log(`original: ${original}, map value: ${value}`);
  return value;
}

observableCreated2$.pipe(
  map(function(value) {
    return logAndGet(value, value * 2);
  }),
  map(function(value) {
    return logAndGet(value, value + 1);
  }),
  map(function(value) {
    return logAndGet(value, value * 3);
  }),
  toArray()
).subscribe(function(arr) { console.log(arr); });

/*
Observable BEGIN
current array: arr[0]
original: 1, map value: 2
original: 2, map value: 3
original: 3, map value: 9
9
current array: arr[1]
original: 2, map value: 4
original: 4, map value: 5
original: 5, map value: 15
15
BEFORE complete
[ 9, 15 ]
Observable END
*/
