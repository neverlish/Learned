const { interval } = require('rxjs');
const { take, groupBy, mergeMap, map, reduce, tap } = require('rxjs/operators');

// reduce 연산자를 추가한 당첨 확률 예
interval(500).pipe(
  take(10),
  groupBy(
    x => Math.random() < 0.7,
    x => `${x}-${x % 2 === 0 ? '짝수' : '홀수'}`
  ),
  mergeMap(
    groupedObservable =>  
      groupedObservable.key === true
        ? groupedObservable.pipe(
          map(x => `당첨!! (${x})`),
          reduce((acc, curr) => [...acc, curr], [])
        )
        : groupedObservable.pipe(
          map(x => `꽝!! (${x})`),
          reduce((acc, curr) => [...acc, curr], [])
        )
  )
).subscribe(result => console.log(result));
/*
[ '당첨!! (0-짝수)',
  '당첨!! (1-홀수)',
  '당첨!! (2-짝수)',
  '당첨!! (5-홀수)',
  '당첨!! (6-짝수)',
  '당첨!! (8-짝수)' ]
[ '꽝!! (3-홀수)', '꽝!! (4-짝수)', '꽝!! (7-홀수)', '꽝!! (9-홀수)' ]
*/

// duration 함수를 사용하는 예
interval(500).pipe(
  take(10),
  groupBy(
    x => Math.random() < 0.7,
    x => `${x}-${x % 2 === 0 ? '짝수' : '홀수'}`,
    groupedObservable =>
      groupedObservable.key === true 
        ? interval(600).pipe(
          tap(x => console.log(`당첨 duration ${x}`))
        )
        : interval(2000).pipe(
          tap(x => console.log(`꽝 duration ${x}`))
        )
  ),
  mergeMap(
    groupedObservable =>  
      groupedObservable.key === true
        ? groupedObservable.pipe(
          map(x => `당첨!! (${x})`),
          reduce((acc, curr) => [...acc, curr], [])
        )
        : groupedObservable.pipe(
          map(x => `꽝!! (${x})`),
          reduce((acc, curr) => [...acc, curr], [])
        )
  )
).subscribe(result => console.log(result));
/*
당첨 duration 0
[ '당첨!! (0-짝수)', '당첨!! (1-홀수)' ]
당첨 duration 0
[ '당첨!! (3-홀수)' ]
꽝 duration 0
[ '꽝!! (2-짝수)', '꽝!! (4-짝수)', '꽝!! (5-홀수)' ]
당첨 duration 0
[ '당첨!! (7-홀수)' ]
[ '꽝!! (6-짝수)', '꽝!! (8-짝수)' ]
[ '당첨!! (9-홀수)' ]
*/
