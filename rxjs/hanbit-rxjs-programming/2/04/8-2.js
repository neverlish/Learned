const { timer } = require('rxjs');
const { sampleTime, take } = require('rxjs/operators');

// sampleTime 연산자의 사용 예
const sourcePoint = 300;
const sourceDelay = 400;
const sampleCount = 2;
const samplePeriod = sourceDelay * sampleCount;

timer(sourcePoint, sourceDelay)
  .pipe(
    sampleTime(samplePeriod),
    take(3)
  )
  .subscribe(result => console.log(result));
/*
1
3
5
*/
