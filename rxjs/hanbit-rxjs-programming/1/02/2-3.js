const { Observable, interval } = require('rxjs');

// 옵저버블 안 unsubscribe 함수 이용

const observableCreated$ = Observable.create(function subscribe(observer) {
  // intervalID 자원 추적
  const intervalID = setInterval(function() {
    observer.next('hi');
  }, 1000);

  // interval ID 자원을 해제하고 재배치하는 방법을 제공
  return function unsubscribe() {
    clearInterval(intervalID);
  }
});

// 옵저버블 구독 해제
const observable = interval(1000);

// 옵저버와 함께 subscribe 함수를 호출해 옵저버블 실행
const subscription = observable.subscribe(function(x) {
  console.log(x);
});

// unsubscribe 함수로 구독 해제(바로 해제됨)
subscription.unsubscribe();

// 여러 개 Subscription 객체의 구독을 모두 해제

const observable1 = interval(400);
const observable2 = interval(300);

const subscription1 = observable1.subscribe(function(x) {
  console.log('first: ' + x);
});

const childSubscription = observable2.subscribe(function(x) {
  console.log('second: ' + x);
});

subscription1.add(childSubscription);

setTimeout(function() {
  // Subscription  객체와 하위에 있는 자식 Subscription 객체의 구독을 취소
  subscription1.unsubscribe();
}, 1000);

/*
second: 0
first: 0
second: 1
first: 1
second: 2
*/
