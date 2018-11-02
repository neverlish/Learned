const { interval } = require('rxjs');
const { partition, take, map } = require('rxjs/operators');

// partition 연산자로 소스 옵저버블을 독립적으로 두는 예
const [winSource$, loseSource$] = interval(500).pipe(
  partition(x => Math.random() < 0.7)
);

winSource$.pipe(
  map(x => `당첨!! (${x})`),
  take(10)
).subscribe(result => console.log(result));

loseSource$.pipe(
  map(x => `꽝!! (${x})`),
  take(10)
).subscribe(result => console.log(result));
/*
당첨!! (0)
꽝!! (0)
당첨!! (1)
당첨!! (3)
꽝!! (3)
당첨!! (4)
당첨!! (5)
꽝!! (5)
당첨!! (6)
꽝!! (6)
꽝!! (7)
당첨!! (8)
꽝!! (8)
당첨!! (9)
당첨!! (10)
꽝!! (10)
당첨!! (12)
꽝!! (12)
꽝!! (15)
꽝!! (16)
*/
