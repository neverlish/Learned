// 3 변수 스코프와 클로저 - 5 클로저 - 1 클로저 시뮬레이션

var _ = require('underscore');

function whatWasTheLocal() {
  var CAPTURED = 'Oh hai';

  return function() {
    return 'The local was: ' + CAPTURED;
  };
}

var reportLocal = whatWasTheLocal();
console.log(reportLocal()); // The local was: Oh hai

function createScaleFunction(FACTOR) {
  return function(v) {
    return _.map(v, function(n) {
      return (n * FACTOR);
    });
  };
}

var scale10 = createScaleFunction(10);
console.log(scale10([1, 2, 3])); // [ 10, 20, 30 ]

function createWeirdScaleFunction(FACTOR) {
  return function(v) {
    this['FACTOR'] = FACTOR;
    var captures = this;

    return _.map(v, _.bind(function(n) { 
      return (n * this['FACTOR']);
    }, captures));
  };
}

var weirdscale10 = createWeirdScaleFunction(10);
console.log(weirdscale10.call({}, [5,6,7])); // [ 50, 60, 70 ]

// 자유 변수

function makeAdder(CAPTURED) {
  return function(free) {
    return free + CAPTURED;
  };
}

var add10 = makeAdder(10);
console.log(add10(32)); // 42

var add1024 = makeAdder(1024);
console.log(add1024(11)); // 1035

function average(array) {
  var sum = _.reduce(array, function(a, b) { return a+b });
  return sum / _.size(array);
}

function averageDamp(FUN) {
  return function(n) {
    return average([n, FUN(n)]);
  }
}

var averageSq = averageDamp(function(n) { return n * n });
console.log(averageSq(10)); // 55

// 셰도잉

var shadow = 0;

function argShadow(shadow) {
  return ['Value is', shadow].join(' ');
}

console.log(argShadow(108)); // Value is 108
console.log(argShadow()); // Value is

var shadowed = 0;
function varShadow(shadowed) {
  var shadowed = 4320000;
  return ['Value is ', shadowed].join(' ');
}

function captureShadow(SHADOWED) {
  return function(SHADOWED) {
    return SHADOWED + 1;
  };
}
var closureShadow = captureShadow(108);
console.log(closureShadow(2)); // 3
