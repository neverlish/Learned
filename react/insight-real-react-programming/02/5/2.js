// 02 - 5 향상된 비동기 프로그래밍 2: async await

// 02 - 5 - 2 async awaiat 활용하기

// 비동기 함수를 병렬로 실행하기

//// 순차적으로 실행되는 비동기 코드
function asyncFunc1() {
  return Promise.resolve(1);
}
function asyncFunc2() {
  return Promise.resolve(2);
}

async function getData() {
  const data1 = await asyncFunc1();
  const data2 = await asyncFunc2();
  // ...
}

//// await 키워드를 나중에 사용해서 병렬로 실행되는 비동기 코드
async function getData2() {
  const p1 = asyncFunc1();
  const p2 = asyncFunc2();
  const data1 = await p1;
  const data2 = await p2;
}

//// Promise.all을 사용해서 병렬로 실행하기
async function getData3() {
  const [data1, data2] = await Promise.all([asyncFunc1(), asyncFunc2()]);
  // ...
}

// 예외 처리하기
//// 동기와 비동기 함수 모두 catch 문에서 처리한다
function doAsync() {
  return Promise.resolve(1);
}
function doSync() {
  throw new Error('error');
}
async function getData4() {
  try {
    await doAsync();
    return doSync();
  } catch (error) {
    console.log(error);
  }
}

// Thenable을 지원하는 async await
//// async await 함수에서 Thenable을 사용한 예
class ThenableExample {
  then(resolve, reject) {
    setTimeout(() => resolve(123), 1000);
  }
}

async function asyncFunc() {
  const result = await new ThenableExample();
  console.log(result);
}
asyncFunc(); // 123