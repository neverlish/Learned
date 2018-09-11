// 12-1-4 프로미스를 사용한 중첩 스코프 개선 - 프로미스 기본 선언

const mPromise = new Promise((resolve, reject) => {
  resolve(1);
});

mPromise.then(res => {
  console.log(typeof res, res); // number 1
});
