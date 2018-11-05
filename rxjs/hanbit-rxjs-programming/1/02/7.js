// 정상적인 프로미스의 값 처리 방식

const promise = new Promise(function(resolve, reject) {
  resolve(1);
});

promise.then(function(value) {
  console.log(value);
}); // 1

// 프로미스의 에러 처리 방식

const promise2 = new Promise(function(resolve, reject) {
  reject(new Error('error'));
});

promise2.then(
  function(value) {
    console.log(value);
  },
  function(error) {
    console.error(error);
  }
); // Error: error

// 옵저버블을 이용한 값 전달과 에러 처리
const { Observable } = require('rxjs');

const observableCreated$ = Observable.create(function(observer) {
  try {
    observer.next(1);
    observer.next(2);
    throw('throw err test');
  } catch (err) {
    observer.error(err);
  } finally {
    observer.complete();
  }
});

observableCreated$.subscribe(
  function next(item) { console.log(item); },
  function error(err) { console.log('error: ' + err); },
  function complete() { console.log('complete'); }
);
/*
1
2
error: throw err test
*/
