const { of } = require('rxjs');
const { reduce, scan } = require('rxjs/operators');

of(10, 10, 20, 0, 50).pipe(
  reduce((acc, value, index) => {
    acc.sum += value;
    acc.ave = acc.sum / (index + 1);
    return acc;
  }, {
    sum: 0,
    acc: 0
  })
).subscribe(value => console.log('reduce', value)); // reduce { sum: 90, acc: 0, ave: 18 }

of(10, 10, 20, 0, 50).pipe(
  scan((acc, value, index) => {
    acc.sum += value;
    acc.ave = acc.sum / (index + 1);
    return acc;
  }, {
    sum: 0,
    acc: 0
  })
).subscribe(value => console.log('scan', value));

/*
scan { sum: 10, acc: 0, ave: 10 }
scan { sum: 20, acc: 0, ave: 10 }
scan { sum: 40, acc: 0, ave: 13.333333333333334 }
scan { sum: 40, acc: 0, ave: 10 }
scan { sum: 90, acc: 0, ave: 18 }
*/
