const { of } = require('rxjs');
const { distinctUntilChanged } = require('rxjs/operators');

// distinctUntilChanged 연산자의 사용 예
of(1, 6, 7, 7, 2, 5, 5, 2, 6).pipe(distinctUntilChanged())
  .subscribe(x => console.log(x));
/*
1
6
7
2
5
2
6
*/

// compare 함수로 값 비교하기
of(
  { a: 1, b: 20 },
  { a: 1, b: 20 },
  { a: 2, b: 40 },
  { a: 3, b: 70 },
  { a: 3, b: 70 },
  { a: 2, b: 40 }
).pipe(distinctUntilChanged((o1, o2) => o1.a === o2.a && o1.b === o2.b))
  .subscribe(x => console.log(JSON.stringify(x)));
/*
{"a":1,"b":20}
{"a":2,"b":40}
{"a":3,"b":70}
{"a":2,"b":40}
*/

// compare 함수 없이 keySelector 함수 사용
of(
  { a: 1, b: 20 },
  { a: 1, b: 20 },
  { a: 2, b: 40 },
  { a: 3, b: 70 },
  { a: 3, b: 70 },
  { a: 2, b: 40 }
).pipe(distinctUntilChanged(null, x => x.a))
  .subscribe(x => console.log(JSON.stringify(x)));
/*
{"a":1,"b":20}
{"a":2,"b":40}
{"a":3,"b":70}
{"a":2,"b":40}
*/

// keySelector와 compare 함수를 함께 사용한 예
of(
  { objKey: { a: 1, b: 20 } },
  { objKey: { a: 1, b: 20 } },
  { objKey: { a: 2, b: 40 } },
  { objKey: { a: 3, b: 70 } },
  { objKey: { a: 3, b: 70 } },
  { objKey: { a: 2, b: 40 } }
).pipe(distinctUntilChanged(
  (o1, o2) => o1.a === o2.a && o1.b === o2.b, // compare 함수
  x => x.objKey // keySelector
)).subscribe(x => console.log(JSON.stringify(x)));
/*
{"objKey":{"a":1,"b":20}}
{"objKey":{"a":2,"b":40}}
{"objKey":{"a":3,"b":70}}
{"objKey":{"a":2,"b":40}}
*/
