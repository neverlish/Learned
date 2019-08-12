// 02 - 4 향상된 비동기 프로그래밍 1: 프로미스

// 02 - 4 - 3 프로미스 사용 시 주의할 점

// return 키워드 깜빡하지 않기

//// return 키워드를 깜빡한 코드
Promise.resolve(10)
  .then(data => {
    console.log(data); // 10
    Promise.resolve(20);
  })
  .then(data => {
    console.log(data); // undefined
  });

// 프로미스는 불변 객체라는 사실 명심하기
//// 프로미스가 수정된다고 생각하고 작성한 코드
function requestData() {
  const p = Promise.resolve(10);
  p.then(() => {
    return 20;
  });
  return p;
}

requestData().then(v => {
  console.log(v); // 10
});

//// then 메서드로 생성된 프로미스를 반환하는 코드
function requestData2() {
  return Promise.resolve(10).then(v => {
    return 20;
  });
}

// 프로미스를 중첩해서 사용하지 않기
//// 프로미스를 중첩해서 사용한 코드
requestData().then(result1 => {
  requestData2(result1).then(result2 => {
    // ...
  });
});

//// 중첩된 코드를 리팩터링한 코드
requestData()
  .then(result1 => {
    return requestData2(result1);
  })
  .then(result2 => {
    // ...
  });

//// Promise.all을 사용해서 변수 참조 문제를 해결한 코드
requestData()
  .then(result1 => {
    return Promise.all([result1, requestData2(result1)]);
  })
  .then(([result1, result2]) => {
    // ...
  });

// 동기 코드의 예외 처리 신경 쓰기
//// 동기 코드에서 발생한 예외가 처리되지 않은 코드
function doSync() {
  throw new Error('error');
}
function fetch() {
  return Promise.resolve(true);
}
function requestData3() {
  doSync();
  return fetch()
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

//// 동기 코드도 예외처리가 되는 코드
function requestData4() {
  return fetch()
    .then(data => {
      doSync();
      console.log(data);
    })
    .catch(error => console.log(error));
}