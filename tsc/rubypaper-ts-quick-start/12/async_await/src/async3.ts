// 12-3-3 Async/Await를 이용한 동기화 - 비동기 함수의 처리 결과가 영향을 미치도록 동기화 실행 - 비동기 함수의 호출 결과가 이어서 호출되는 비동기 함수에 영향을 미치도록 함

function delay3(msg, ms): Promise<any> {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(msg);
    }, ms);
  }).then(function(v) {
    console.log(v + ' ' + ms + 'ms');
    return v;
  });
}

async function sync3() {
  let start = new Date().getTime();
  let result1: Promise<any> = await delay3('a', 1000);
  let result2: Promise<any> = await delay3(result1 + 'b', 500);
  let result3: Promise<any> = await delay3(result2 + 'c', 100);

  let end = new Date().getTime();
  console.log('시간 : ', end - start + 'ms');
}

sync3();
/*
a 1000ms
ab 500ms
abc 100ms
시간 :  1615ms
*/
