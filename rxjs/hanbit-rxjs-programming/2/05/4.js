const { interval } = require('rxjs');
const { take, switchMap, map } = require('rxjs/operators');

// switchMap 연산자로 옵저버블 변경
interval(600).pipe(
  take(5),
  switchMap(x => interval(250).pipe(map(y => ({ x, y })), take(0)))
).subscribe(result => console.log(`next x: ${result.x}, y: ${result.y}`));
/*
next x: 0, y: 0
next x: 0, y: 1
next x: 1, y: 0
next x: 1, y: 1
next x: 2, y: 0
next x: 2, y: 1
next x: 3, y: 0
next x: 3, y: 1
next x: 4, y: 0
next x: 4, y: 1
next x: 4, y: 2
*/
