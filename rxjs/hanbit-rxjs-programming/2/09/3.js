const { range } = require('rxjs');
const { find } = require('rxjs/operators');

// find 연산자의 사용 예
const getRangeObservable = count => range(1, count);
function subscribeWithFindGreaterThan3(count) {
  getRangeObservable(count)
    .pipe(find(x => x > 3))
    .subscribe(value => console.log(`개수(count): ${count}, 조건: x > 3, 값(value): ${value}`));
}

subscribeWithFindGreaterThan3(5);
subscribeWithFindGreaterThan3(1);
/*
개수(count): 5, 조건: x > 3, 값(value): 4
개수(count): 1, 조건: x > 3, 값(value): undefined
*/
