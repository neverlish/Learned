// 12-3-3 Async/Await를 이용한 동기화 - 비동기 호출을 동기화 - Async/Await를 도입해 비동기 처리를 동기로 실행하기

function delay2(msg: string) {
  let ms: number = (Math.floor(Math.random() * 1000) + 1);
  return new Promise(function (resolve) {
    setTimeout(resolve, ms, msg);
  }).then(function(v) {
    console.log(v, ms + 'ms');
  });
}

async function sync2() {
  let start = new Date().getTime();

  await delay2('a');
  await delay2('b');
  await delay2('c');

  let end = new Date().getTime();
  console.log('시간 : ', end - start + 'ms');
}

sync2();

/*
a 269ms
b 164ms
c 395ms
시간 :  840ms
*/
