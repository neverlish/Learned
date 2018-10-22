const { Observable } = require('rxjs');

const numbers$ = new Observable(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
  } catch (e) {
    observer.error(e);
  }
});

numbers$.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log('데이터 전달 완료')
});

/*
1
2
3
데이터 전달 완료
*/
