const { of, interval } = require('rxjs');
const { distinct, map, take } = require('rxjs/operators');

// distinct 연산자로 중복 값을 발행하지 않는 예
of(1, 6, 7, 7, 2, 5, 5, 2, 6).pipe(distinct()).subscribe(x => console.log(x));
/*
1
6
7
2
5
*/

// 객체 타입 값의 중복 확인
of(
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
).pipe(distinct(), map(x => x.value)).subscribe(x => console.log(x));
/*
20
40
70
20
40
70
*/

// 키 값을 찾는 함수를 인자로 사용
of(
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
  { id: 1, value: 20 },
  { id: 2, value: 40 },
  { id: 3, value: 70 },
).pipe(distinct(obj => obj.id), map(x => x.value)).subscribe(x => console.log(x));
/*
20
40
70
*/

// flush 옵저버블 사용 예
interval(200).pipe(
  take(25),
  map(x => ({ original: x, value: x % 5 })),
  distinct(x => x.value, interval(2100))
).subscribe(x => console.log(JSON.stringify(x)));

/*
{"original":0,"value":0}
{"original":1,"value":1}
{"original":2,"value":2}
{"original":3,"value":3}
{"original":4,"value":4}
{"original":10,"value":0}
{"original":11,"value":1}
{"original":12,"value":2}
{"original":13,"value":3}
{"original":14,"value":4}
{"original":20,"value":0}
{"original":21,"value":1}
{"original":22,"value":2}
{"original":23,"value":3}
{"original":24,"value":4}
*/
