const { interval } = require('rxjs');
const { map, tap } = require('rxjs/operators');
const mergeSeqTake = require('./mergeSeqTake');

const req1$ = interval(500).pipe(
  map(value => `req1 - ${value}`),
  tap(x => console.log(`[tap] ${x}`))
);

const req2$ = interval(1000).pipe(
  map(value => `req2 - ${value}`),
  tap(x => console.log(`[tap] ${x}`))
);

const req3$ = interval(500).pipe(
  map(value => `req3 - ${value}`),
  tap(x => console.log(`[tap] ${x}`))
);

mergeSeqTake(req1$, req2$, req3$, 2).subscribe(x => console.log(x));
/*
[tap] req1 - 0
[tap] req3 - 0
[tap] req2 - 0
[tap] req1 - 1
req1 - 1
[tap] req3 - 1
[tap] req2 - 1
req2 - 1
req3 - 1
*/
