// 3 변수 스코프와 클로저 - 2 어휘 스코프

var _ = require('underscore');

aVariable = 'Outer';

function afun() {
  var aVariable = 'Middle';

  return _.map([1,2,3], function(e) {
    var aVariable = 'In';

    return [aVariable, e].join(' ');
  });
}

console.log(afun()); // [ 'In 1', 'In 2', 'In 3' ]

