// 피보나치 수열 2

var cacher = function(cache, func) {
  var calculate = function(n) {
    if (typeof(cache[n]) === 'number') {
      result = cache[n];
    } else {
      result = cache[n] = func(calculate, n);
    }

    return result;
  }

  return calculate;
};
