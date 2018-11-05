const { interval } = require('rxjs');
const { take, groupBy, mergeMap, map } = require('rxjs/operators');

// elementSelector 함수를 추가한 예
interval(500).pipe(
  take(10),
  groupBy(
    x => Math.random() < 0.7,
    x => `${x}-${x % 2 === 0 ? '짝수' : '홀수'}`
  ),
  mergeMap(
    groupedObservable =>
      groupedObservable.key === true
        ? groupedObservable.pipe(map(x => `당첨!! (${x})`))
        : groupedObservable.pipe(map(x => `꽝!! (${x})`))
  )
).subscribe(result => console.log(result));
/*
당첨!! (0-짝수)
꽝!! (1-홀수)
당첨!! (2-짝수)
당첨!! (3-홀수)
당첨!! (4-짝수)
당첨!! (5-홀수)
당첨!! (6-짝수)
당첨!! (7-홀수)
당첨!! (8-짝수)
당첨!! (9-홀수)
*/
