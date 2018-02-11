// 6 브라우저 환경에서의 자바스크립트 - 1 단일 스레드 환경
// sleep 함수 구현 예

function sleep(waitMilliseconds) {
  var waitUntil = Date.now() + waitMilliseconds;
  while (Date.now() < waitUntil) {
    ;
  }
}
