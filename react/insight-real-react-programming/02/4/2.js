// 02 - 4 향상된 비동기 프로그래밍 1: 프로미스

// 02 - 4 - 2 프로미스 활용하기

// 병렬로 처리하기: Promise.all

//// 순차적으로 실행되는 비동기 코드
/*
requestData1()
  .then(data => {
    console.log(data);
    return requestData2();
  })
  .then(data => {
    console.log(data);
  });
*/

//// 병렬로 실행되는 코드
/*
requestData1().then(data => console.log(data));
requestData2().then(data => console.log(data));
*/

//// Promise.all을 사용하는 코드
/*
Promise.all([requestData1(), requestData2()]).then(([data1, data2]) => {
  console.log(data1, data2);
});
*/

// 가장 빨리 처리된 프로미스 가져오기: Promise.race

//// Promise.race를 사용한 간단한 코드
/*
Promise.race([
  requestData(),
  new Promise((_, reject) => setTimeout(reject, 3000)),
])
  .then(data => console.log((data)))
  .catch(error => console.log(error));
*/

// 프로미스를 이용한 데이터 캐싱
//// 프로미스로 캐싱 기능 구현하기
/*
let cachedPromise;
function getData() {
  cachedPromise = cachedPromise || requestData();
  return cachedPromise;
}

getData().then(v => console.log(v));
getData().then(v => console.log(v));
*/