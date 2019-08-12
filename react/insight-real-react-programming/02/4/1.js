// 02 - 4 향상된 비동기 프로그래밍 1: 프로미스

// 02 - 4 - 1 프로미스 이해하기

// 콜백 패턴의 문제
//// 콜백 함수의 중첩
function requestData1(callback) {
  // ...
  // callback(data);
}
function requestData2(callback) {
  // ...
  // callback(data);
}
function onSuccess1(data) {
  console.log(data);
  requestData2(data);
}
function onSuccess2(data) {
  console.log(data);
  // ...
}
requestData1(onSuccess1);

//// 간단한 프로미스 코드 예
/*
requestData1()
  .then(data => {
    console.log(data);
    return requestData2();
  })
  .then(data => {
    console.log(data);
    // ...
  });
*/

// 프로미스를 생성하는 방법
//// 프로미스를 생성하는 방법

const p1 = new Promise((resolve, reject) => {
  // ...
  // resolve(data)
  // or reject('error message')
});

const p2 = Promise.reject('error message');
const p3 = Promise.resolve({});

//// Promise.resolve의 반환값
const p4 = Promise.resolve(123);
console.log(p4 !== 123); // true
const p5 = new Promise(resolve => setTimeout(() => resolve(10), 1));
console.log(Promise.resolve(p5) === p5); // tre

// 프로미스 이용하기 1: then
//// then 메서드를 사용한 간단한 코드
// requestData1().then(onResolve, onREject)
Promise.resolve(123).then(data => console.log(data)); // 123
Promise.reject('err').then(null, error => console.log(error)); // err

//// 연속해서 then 메서드 호출하기
/*
requestData1()
  .then(data => {
    console.log(data);
    return requestData2();
  })
  .then(data => {
    return data + 1;
  })
  .then(data => {
    throw new Error('some error');
  })
  .then(null, error => {
    console.log(error);
  });
*/

//// 거부됨 상태가 되면 onReject 함수를 호출한다
Promise.reject('err')
  .then(() => console.log('then 1'))
  .then(() => console.log('then 2'))
  .then(() => console.log('then 3'), () => console.log('then 4'))
  .then(() => console.log('then 5'), () => console.log('then 6')); // then 4, then 5

// 프로미스 이용하기 2: catch
//// 같은 기능을 하는 then 메서드와 catch 메서드
Promise.reject(1).then(null, error => {
  console.log(error);
}); // 1

Promise.reject(1).catch(error => {
  console.log(error);
}); // 1

//// then 메서드의 onReject를 사용했을 때의 문제점
Promise.resolve().then(
  () => {
    throw new Error('some error');
  },
  error => {
    console.log(error);
  },
); // UnhandledPromiseRejectionWarning: Error: some error

//// onReject 함수를 사용하지 않고 catch를 사용한 예
Promise.resolve()
  .then(() => {
    throw new Error('some error');
  })
  .catch(error => {
    console.log(error);
  }); // Error: some error

//// catch 메서드 이후에도 then 메서드 사용하기
Promise.reject(10)
  .then(data => {
    console.log('then1:', data);
    return 20;
  })
  .catch(error => {
    console.log('catch:', error);
    return 30;
  })
  .then(data => {
    console.log('then2:', data);
  }); // catch: 10 then2: 30

// 프로미스 이용하기 3: finally
//// finally를 사용한 간단한 코드
/*
requestData()
  .then(data => {
    // ...
  })
  .catch(error => {
    // ...
  })
  .finally(() => {
    // ...
  });
*/

//// finally 메서드는 새로운 프로미스를 생성하지 않는다
/*
function requestData() {
  return fetch()
    .catch(error => {
      // ...
    })
    .finally(() => {
      sendLogToServer('requestData finished');
    });
}

requestData().then(data => console.log(data));
*/