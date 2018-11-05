const { interval, timer } = require('rxjs');
const { sample, take } = require('rxjs/operators');

// sample 연산자의 사용 예
const sampleSize = 3;
const sourceInterval = 200;
const sampleDelay = 100;
interval(sourceInterval)
  .pipe(sample(timer(
    sourceInterval + sampleDelay,
    sourceInterval * sampleSize
  )), take(4))
  .subscribe(result => console.log(result));
/*
0
3
6
9
*/
