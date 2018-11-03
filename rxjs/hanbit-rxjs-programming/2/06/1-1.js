const { timer, merge } = require('rxjs');
const { map, take } = require('rxjs/operators');

// 동시에 구독하는 옵저버블 예
const req1$ = timer(0, 200).pipe(map(value => `req1: ${value}`), take(6));
const req2$ = timer(0, 500).pipe(map(value => `req2: ${value}`), take(11));
const req3$ = timer(0, 300).pipe(map(value => `req3: ${value}`), take(7));
const req4$ = timer(0, 500).pipe(map(value => `req4: ${value}`), take(9));
const req5$ = timer(0, 100).pipe(map(value => `req5: ${value}`), take(8));
const req6$ = timer(0, 700).pipe(map(value => `req6: ${value}`), take(4));
const concurrent = 2;

merge(req1$, req2$, req3$, req4$, req5$, req6$, concurrent).subscribe(req => console.log(`response from ${req}`));
/*
response from req1: 0
response from req2: 0
response from req1: 1
response from req1: 2
response from req2: 1
response from req1: 3
response from req1: 4
response from req2: 2
response from req1: 5
response from req3: 0
response from req3: 1
response from req2: 3
response from req3: 2
response from req3: 3
response from req2: 4
response from req3: 4
response from req2: 5
response from req3: 5
response from req3: 6
response from req4: 0
response from req2: 6
response from req4: 1
response from req2: 7
response from req4: 2
response from req2: 8
response from req4: 3
response from req2: 9
response from req4: 4
response from req2: 10
response from req5: 0
response from req5: 1
response from req5: 2
response from req5: 3
response from req4: 5
response from req5: 4
response from req5: 5
response from req5: 6
response from req5: 7
response from req6: 0
response from req4: 6
response from req4: 7
response from req6: 1
response from req4: 8
response from req6: 2
response from req6: 3
*/
