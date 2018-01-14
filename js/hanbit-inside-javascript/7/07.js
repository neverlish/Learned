// 커링 1

function calculate(a, b, c) {
  return a * b + c;
}

function curry(func) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return func.apply(null, args.concat(Array.prototype.slice.call(arguments)));
  }
}

var new_func = curry(calculate, 1);
console.log(new_func(2, 3)); // (출력값) 5 // 1x2+3 = 5
var new_func2 = curry(calculate, 1, 3);
console.log(new_func2(3)); // (출력값) 6 // 1x3+3 = 6
