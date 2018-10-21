// range 함수 사용 예

const { range } = require('rxjs');

range(1, 5).subscribe(
  x => console.log(`range(1, 5) next: ${x}`),
  err => console.error(`error.message: ${err.message}`),
  () => console.log('completed')
);

range(2, 5).subscribe(
  x => console.log(`range(2, 5) next: ${x}`),
  err => console.error(`error.message: ${err.message}`),
  () => console.log('completed') 
);

/*
range(1, 5) next: 1
range(1, 5) next: 2
range(1, 5) next: 3
range(1, 5) next: 4
range(1, 5) next: 5
completed
range(2, 5) next: 2
range(2, 5) next: 3
range(2, 5) next: 4
range(2, 5) next: 5
range(2, 5) next: 6
completed
*/
