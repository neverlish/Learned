const { range } = require('rxjs');
const { finalize } = require('rxjs/operators');

range(1, 3).pipe(
  finalize(() => console.log('FINALLY CALLBACK'))
).subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.log('COMPLETE')
);
/*
1
2
3
COMPLETE
FINALLY CALLBACK
*/
