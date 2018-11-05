const { range } = require('rxjs');
const { defaultIfEmpty } = require('rxjs/operators');

// defaultIfEmpty 연산자를 이용하는 empty 옵저버블 사용 예
const getRangeObservable = count => range(1, count);
function subscribeWithDefaultIfEmpty(count) {
  getRangeObservable(count)
    .pipe(defaultIfEmpty('EMPTY'))
    .subscribe(value => console.log(`개수(count): ${count}, 값(value): ${value}`));
}

subscribeWithDefaultIfEmpty(0);
subscribeWithDefaultIfEmpty(3);
/*
개수(count): 0, 값(value): EMPTY
개수(count): 3, 값(value): 1
개수(count): 3, 값(value): 2
개수(count): 3, 값(value): 3
*/
