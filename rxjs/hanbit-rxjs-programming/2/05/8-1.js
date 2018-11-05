const { interval } = require('rxjs');
const { take, groupBy, mergeMap, map } = require('rxjs/operators');

// groupBy 연산자로 당첨과 꽝을 출력하는 예
interval(500).pipe(
  take(10),
  groupBy(x => Math.random() < 0.7),
  mergeMap(
    groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(map(x => `당첨!! (${x})`))
        : groupedObservable.pipe(map(x => `꽝!! (${x})`))
  )
).subscribe(result => console.log(result));
/*
당첨!! (0)
당첨!! (1)
꽝!! (2)
당첨!! (3)
꽝!! (4)
당첨!! (5)
당첨!! (6)
당첨!! (7)
당첨!! (8)
꽝!! (9)
*/
