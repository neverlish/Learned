// 02 - 5 향상된 비동기 프로그래밍 2: async await

// 02 - 5 - 1 async await 이해하기

// async await 함수는 프로미스를 반환한다

//// 프로미스를 반환하는 async await 함수
async function getData() {
  return 123;
}
getData().then(data => console.log(data)); // 123

//// 프로미스를 반환하는 async await 함수
async function getData2() {
  return Promise.resolve(123);
}
getData2().then(data => console.log(data)); // 123

//// async await 함수에서 예외가 발생하는 경우
async function getData3() {
  throw new Error('123')
}
getData3().catch(error => console.log(error)); // Error: 123

// await 키워드를 사용하는 방법

//// await 키워드의 사용 예
function requestData(value) {
  return new Promise(resolve =>
    setTimeout(() => {
      console.log('requestData:', value);
      resolve(value);
    }, 100),
  );
}

async function getData4() {
  const data1 = await requestData(10);
  const data2 = await requestData(20);
  console.log(data1, data2);
  return [data1, data2];
}

getData4();
/*
requestData: 10
requestData: 20
10 20
*/

//// await 키워드는 async 키워드 없이 사용할 수 없다
function getData5() {
  // const data = await requestData(10); // await is only valid in async function
  // console.log(data);
}

// async await는 프로미스보다 가독성이 좋다
//// async await와 프로미스 비교하기
function asyncFunc1() {
  return Promise.resolve(1);
}
function asyncFunc2() {
  return Promise.resolve(2);
}
function getDataPromise() {
  asyncFunc1()
    .then(data => {
      console.log(data);
      return asyncFunc2();
    })
    .then(data => {
      console.log(data);
    });
}

async function getDataAsync() {
  const data1 = await asyncFunc1();
  console.log(data1);
  const data2 = await asyncFunc2();
  console.log(data2);
}

//// 의존성이 높은 코드에서 가독성 비교하기
function asyncFunc3() {
  return Promise.resolve(3);
}
function getDataPromise2() {
  return asyncFunc1()
    .then(data => Promise.all([data1, asyncFunc2(data1)]))
    .then(([data1, data2]) => {
      return asyncFunc3(data1, data2);
    })
}
async function getDataAsync2() {
  const data1 = await asyncFunc1();
  const data2 = await asyncFunc2(data1);
  return asyncFunc3(data1, data2);
}