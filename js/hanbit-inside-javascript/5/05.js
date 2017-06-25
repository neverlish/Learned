// 스코프 체인 - 함수를 호출한 경우 생성되는 실행 컨텍스트의 스코프 체인 2

var value = 'value1';

function printFunc() {
  var value = 'value2';

  function printValue() {
    return value;
  }

  console.log(printValue());
}

printFunc();
