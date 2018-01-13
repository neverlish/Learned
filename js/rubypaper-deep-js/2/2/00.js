// 2 자바스크립트의 스코프와 클로저 - 2 클로저란?

// 클로저의 예
function outer() {
  var count = 0;
  var inner = function () {
    return ++count;
  };
  return inner;
}
var increase = outer();

console.log(increase()); // 1
console.log(increase()); // 2

// 클로저 응용 예
function outer2() {
  var count = 0;
  return {
    increase: function() {
      return ++count;
    },
    decrease: function() {
      return --count;
    }
  };
}

var counter = outer2();
console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); //1

var counter2 = outer2();
console.log(counter2.increase()); // 1


// 클로저로 구현하는 static 변수
var countFactory = (function() {
  var staticCount = 0;
  return function() {
    var localCount = 0;
    return {
      increase: function() {
        return {
          static: ++staticCount,
          local: ++localCount
        };
      },
      decrease: function() {
        return {
          static: --staticCount,
          local: --localCount
        };
      }
    };
  };
}());

var counter3 = countFactory(), counter4 = countFactory();
console.log(counter3.increase()); // { static: 1, local: 1 }
console.log(counter3.increase()); // { static: 2, local: 2 }
console.log(counter4.decrease()); // { static: 1, local: -1 }
console.log(counter3.increase()); // { static: 2, local: 3 }
