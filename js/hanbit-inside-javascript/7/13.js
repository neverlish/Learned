// 반복 함수 - reduce

Array.prototype.reduce = function(callback, memo) {
  // this가 null인지, 배열인지 체크
  // callback이 함수인지 체크

  var obj = this;
  var value, accumulated_value = 0;

  for (var i = 0; i < obj.length; i++) {
    value = obj[i];
    accumulated_value = callback.call(null, accumulated_value, value);
  }
  return accumulated_value;
};

var arr = [1, 2, 3];
var accumulated_value = arr.reduce(function(a, b) {
  return a + b*b;
});

console.log(accumulated_value); // (출력값) 14 // 1x1+2x2+3x3=14
