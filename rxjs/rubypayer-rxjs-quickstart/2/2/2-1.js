const { Observable } = require('rxjs');

const numbers$ = new Observable(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    // 에러가 발생한다면?
    throw new Error('데이터 전달 도중 에러가 발생했습니다');
    observer.next(3);
  } catch (e) {
    observer.error(e);
  }
});

numbers$.subscribe({
  next: v => console.log(v),
  error: e => console.error(e)
});

/*
1
2
Error: 데이터 전달 도중 에러가 발생했습니다
*/
