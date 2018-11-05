const { timer, range } = require('rxjs');
const { map, mergeMap } = require('rxjs/operators');

const requests = [
  timer(Math.floor(Math.random() * 2000)).pipe(map(value => 'req1')),
  timer(Math.floor(Math.random() * 1000)).pipe(map(value => 'req2')),
  timer(Math.floor(Math.random() * 1500)).pipe(map(value => 'req3'))
];

range(0, 3).subscribe(x => 
  requests[x].subscribe(req => console.log(`response from ${req}`))
);
/*
response from req2
response from req3
response from req1
(매번 순서가 다름)
*/

// mergeMap 연산자로 리턴한 옵저버블을 구독해 값 발행
range(0, 3).pipe(mergeMap(x => requests[x]))
  .subscribe(req => console.log(`response from ${req}`));
/*
response from req3
response from req1
response from req2
(매번 순서가 다름)
*/
