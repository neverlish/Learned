// 12-1-4 프로미스를 사용한 중첩 스코프 개선 - reject 함수 호출 후 예외 상황 처리

const basicRejectPromise = new Promise((resolve, reject) => {
  // reject를 통해 예외 상황을 발생시킴
  reject('Error!');
}).catch((err) => {
  // 예외 상황 처리
  console.log(err);
});
