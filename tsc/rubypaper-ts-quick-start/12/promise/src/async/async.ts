// 12-1-5 프로미스의 비동기 호출 제어 - 호출 순서와 응답 순서가 일치하지 않는 문제 - delay 함수의 호출 순서와 응답 순서가 일치하지 않음

function delay(msg) {
  let ms: number = (Math.floor(Math.random() * 1000) + 1);
  setTimeout(function() {
    console.log(msg);
  }, ms)
}

function async() {
  delay('hello1');
  delay('hello2');
  delay('hello3');
}

async();
