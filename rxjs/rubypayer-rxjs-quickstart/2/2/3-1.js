const { of } = require('rxjs');

of(10, 20, 30)
  .subscribe({
    next: console.log,
    error: console.error,
    complete: () => console.log('완료')
  });

/*
10
20
30
완료
*/
