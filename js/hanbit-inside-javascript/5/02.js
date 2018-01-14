// 실행 컨텍스트 실행 과정

function execute(param1, param2) {
  var a = 1, b = 2;
  function func() {
    return a + b;
  }
  return param1 + param2 + func();
};

console.log(execute(3,4)); // 10
