const { range } = require('rxjs');

range(1, 10)
  .subscribe({
    next: console.log,
    error: console.error,
    complete: () => console.log('완료')
  });

/*
1
2
3
4
5
6
7
8
9
10
완료
*/
