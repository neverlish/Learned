const { Observable } = require('rxjs');

const numbers$ = Observable.create(function subscribe(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
});

numbers$.subscribe(v => console.log(v));

/*
1
2
3
*/
