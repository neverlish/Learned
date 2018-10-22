const { interval } = require('rxjs');

interval(1000)
  .subscribe({
    next: v => console.log(v),
    error: e => console.error(e),
    complete: () => console.log('완료')
  });

/*
0
1
2
...
*/
