const { range } = require('rxjs');
const { scan } = require('rxjs/operators');

// 초깃값이 없는 scan 연산자 예
range(0, 3).pipe(
  scan((accumulation, currentValue) => {
    console.log(`accumulation ${accumulation}, currentValue: ${currentValue}`);
    return accumulation + currentValue;
  })
).subscribe(result => console.log(`result ${result}`));
/*
result 0
accumulation 0, currentValue: 1
result 1
accumulation 1, currentValue: 2
result 3
*/
