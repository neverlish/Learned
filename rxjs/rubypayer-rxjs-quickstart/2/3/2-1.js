const promise = new Promise((resolve, reject) => {
  console.log('create promise')
  try {
    resolve(1);
  } catch(e) {
    reject('error promise');
  }
});

promise.then(
  value => console.log(`첫번째 promise ${value}`),
  error => console.error(`첫번째 promise ${error}`)
);

promise.then(
  value => console.log(`두번째 promise ${value}`),
  error => console.error(`두번째 promise ${error}`)
);

/*
create promise
첫번째 promise 1
두번째 promise 1
*/

const { Observable } = require('rxjs');
const numbers$ = Observable.create(observer => {
  console.log('create observable');
  try {
    observer.next(1);
  } catch(e) {
    observer.error('error observable');
  } finally {
    observer.complete();
  }
});

numbers$.subscribe(
  value => console.log(`첫번째 observable ${value}`),
  error => console.error(`첫번째 observable ${error}`)
);

numbers$.subscribe(
  value => console.log(`두번째 observable ${value}`),
  error => console.error(`두번째 observable ${error}`)
);

/*
create observable
첫번째 promise 1
두번째 promise 1
*/
