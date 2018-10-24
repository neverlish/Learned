const { Observable } = require('rxjs');

const interval$ = new Observable(function subscribe(observer) {
  const id = setInterval(function() {
    observer.next(new Date().toString());
  }, 1000);

  return function() { // 자원을 해제하는 함수
    console.log('interval 제거');
    clearInterval(id);
  }
});

const subscription = interval$.subscribe(v => console.log(v));

// 5초 후 구독을 해제한다
setTimeout(function() {
  subscription.unsubscribe();
}, 5000);

/*
Mon Oct 22 2018 21:16:10 GMT+0900 (KST)
Mon Oct 22 2018 21:16:11 GMT+0900 (KST)
Mon Oct 22 2018 21:16:12 GMT+0900 (KST)
Mon Oct 22 2018 21:16:13 GMT+0900 (KST)
interval 제거
*/
