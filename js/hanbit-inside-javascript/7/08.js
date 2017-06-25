// 커링 2

function calculate(a, b, c) {
  return a*b+c;
}

function curry2(func) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    var arg_idx = 0;
    for (var i = 0; i < args.length && arg_idx < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg_idx++];
      }
    }
    return func.apply(null, args)
  }
}

var new_func = curry2(calculate, 1, undefined, 4);
console.log(new_func(3)); // (출력값) 7
