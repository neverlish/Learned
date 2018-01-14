// 클로저의 활용 - setTimeout()에 지정되는 함수의 사용자 정의

function callLater(obj, a, b) {
  return (function() {
    obj['sum'] = a + b;
    console.log(obj['sum']);
  });
}

var sumObj = {
  sum: 0
}

var func = callLater(sumObj, 1, 2);
setTimeout(func, 500);
