// 스코프 체인 - 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인 4

var value = 'value1';

function printValue() {
  return value;
}

function printFunc(func) {
  var value = 'value2';
  console.log(func());
}

printFunc(printValue);
