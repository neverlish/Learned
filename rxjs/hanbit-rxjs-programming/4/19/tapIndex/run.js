const { interval } = require('rxjs');
const { take, filter, map } = require('rxjs/operators');
const tapIndex = require('./tapIndex');

interval(200).pipe(
  take(10),
  filter(x => x % 2 === 0),
  tapIndex((value, index) =>
    console.log(`value: ${value}, index: ${index}`)
  ),
  map(x => x + 1)
).subscribe(result => console.log(`result: ${result}`));
/*
value: 0, index: 0
result: 1
value: 2, index: 1
result: 3
value: 4, index: 2
result: 5
value: 6, index: 3
result: 7
value: 8, index: 4
result: 9
*/
