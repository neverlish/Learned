const { range } = require('rxjs');
const { isEmpty } = require('rxjs/operators');

// isEmpty 연산자의 사용 예
const getRangeObservable = count => range(1, count);
function subscribeWithIsEmpty(count) {
  getRangeObservable(count)
    .pipe(isEmpty())
    .subscribe(value => console.log(`개수(count): ${count}, 값(value): ${value}`));
}

subscribeWithIsEmpty(0);
subscribeWithIsEmpty(3);
/*
개수(count): 0, 값(value): true
개수(count): 3, 값(value): false
*/
