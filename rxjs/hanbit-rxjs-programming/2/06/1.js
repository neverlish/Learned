const { timer, merge } = require('rxjs');
const { map } = require('rxjs/operators');

// merge 연산자 사용 예
const req1$ = timer(Math.floor(Math.random() * 2000)).pipe(map(value => 'req1'));
const req2$ = timer(Math.floor(Math.random() * 1000)).pipe(map(value => 'req2'));
const req3$ = timer(Math.floor(Math.random() * 1500)).pipe(map(value => 'req3'));

merge(req1$, req2$, req3$).subscribe(req => console.log(`response from ${req}`));
/*
response from req2
response from req3
response from req1
*/
