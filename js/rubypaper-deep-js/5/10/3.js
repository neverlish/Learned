// 5 디자인 패턴 - 10 커링 패턴
// 커링 패턴을 이용한 단위 변환 예

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
  
  function unitConvert(fromUnit, toUnit, factor, input) {
    return `${input} ${fromUnit} === ${(input*factor).toFixed(2)} ${toUnit}`;
  }

  var cm2inch = unitConvert.curry('cm', 'inch', 0.393701),
      metersquare2pyoung = unitConvert.curry('m^2', 'pyoung', 0.3025),
      kg2lb = unitConvert.curry('kg', 'lb', 2.204623),
      kmph2mph = unitConvert.curry('km/h', 'mph', 0.621371);

  console.log(cm2inch(10)); // 10 cm === 3.94 inch
  console.log(metersquare2pyoung(30)); // 30 m^2 === 9.07 pyoung
  console.log(kg2lb(50)); // 50 kg === 110.23 lb
  console.log(kmph2mph(100)); // 100 km/h === 62.14 mph
}());
