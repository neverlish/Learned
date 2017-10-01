// 4 고차원 함수 - 2 다른 함수를 반환하는 함수 - 2 변수를 캡처하는 이유

var _ = require('underscore');

function uniqueString(len) {
  return Math.random().toString(36).substr(2, len);
}

console.log(uniqueString(10)); // ex) h72c8bs3gu

function uniqueString2(prefix) {
  return [prefix, new Date().getTime()].join('');
}

console.log(uniqueString2('argento')); // ex) argento1506736463457

/////

function makeUniqueStringFunction(start) {
  var COUNTER = start;

  return function(prefix) {
    return [prefix, COUNTER++].join('');
  }
}

var uniqueString3 = makeUniqueStringFunction(0);
console.log(uniqueString3('dari')); // dari0
console.log(uniqueString3('dari')); // dari1

var generator = {
  count: 0,
  uniqueString: function(prefix) {
    return [prefix, this.count++].join('');
  }
}

console.log(generator.uniqueString('bohr')); // bohr0
console.log(generator.uniqueString('bohr')); // bohr1

// count를 재할당
generator.count = 'gotcha';
console.log(generator.uniqueString('bohr')); // bohrNaN

// 동적으로 바인딩
console.log(generator.uniqueString.call({count: 1337}, 'bohr')); // bohr1337

var omgenerator = (function(init) {
  var COUNTER = init;

  return {
    uniqueString: function(prefix) {
      return [prefix, COUNTER++].join('');
    }
  };
})(0);

console.log(omgenerator.uniqueString('lichking-')); // lichking-0
console.log(omgenerator.uniqueString('lichking-')); // lichking-1
