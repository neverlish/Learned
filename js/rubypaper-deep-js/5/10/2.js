// 5 디자인 패턴 - 10 커링 패턴
// Function.prototype에 커링 패턴 함수 추가

(function() {
  Function.prototype.curry = function() {
    if (arguments.length < 1) {
      return this;
    }
    var _this = this,
        args = Array.prototype.slice.apply(arguments);
    
    return function() {
      return _this.apply(this, args.concat(Array.prototype.slice.apply(arguments)));
    }
  }

  function sum(x, y) {
    return x + y;
  }

  var adderFourCurry = sum.curry(4);
  console.log(adderFourCurry(5)); // 9
  console.log(adderFourCurry(10)); // 14

  function sum4(x, y, z, w) {
    return x + y + z + w;
  }

  var adderCurry = sum4.curry(5, 1);
  console.log(adderCurry(2, 3)); // 11
}());
