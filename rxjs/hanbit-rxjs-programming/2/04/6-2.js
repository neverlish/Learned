const { interval } = require('rxjs');
const { take, debounceTime } = require('rxjs/operators');

// deboundce 연산자로 발행 간격에 따라 값 발행
interval(400).pipe(take(4), debounceTime(300))
  .subscribe(x => console.log(
    `- interval(400).pipe(take(4), debounceTime(300)) next: ${x}`
  ));

interval(400).pipe(take(4), debounceTime(500))
  .subscribe(x => console.log(
    `-- interval(400).pipe(take(4), debounceTime(500)) next: ${x}`
  ));

/*
- interval(400).pipe(take(4), debounceTime(300)) next: 0
- interval(400).pipe(take(4), debounceTime(300)) next: 1
- interval(400).pipe(take(4), debounceTime(300)) next: 2
- interval(400).pipe(take(4), debounceTime(300)) next: 3
-- interval(400).pipe(take(4), debounceTime(500)) next: 3
*/
