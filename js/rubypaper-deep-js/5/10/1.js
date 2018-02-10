// 5 디자인 패턴 - 10 커링 패턴
// 합 함수를 활용한 커링 패턴 예

(function () {
  function sum(x, y) {
    return x + y;
  }

  var makeAdder = function(x) {
    return function (y) {
      return sum(x, y);
    };
  };

  var adderFour = makeAdder(4);
  console.log(adderFour(1)); // 5
  console.log(adderFour(5)); // 9
}());
