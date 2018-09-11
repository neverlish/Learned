// 12-1-5 프로미스의 비동기 호출 제어 - 비동기 시뮬레이션을 위해 지연 추가 후 then 메서드를 호출함

const promiseAsync = new Promise((resolve, reject) => {
  let sec: number = (Math.floor(Math.random() * 5) + 1);
  setTimeout(function (isTrue) {
    if (isTrue) {
      resolve(sec);
    }
  }, sec * 1000, true);
}).then(res => {
  console.log(res + 's'); // 1s or 2s or 3s or 4s or 5s
});
