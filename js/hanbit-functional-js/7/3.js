// 7 순수성, 불변성, 변경 정책 - 3 변화 제어 정책

var _ = require('underscore');
var {construct, megaCheckedSqr, always, Container} = require('../functions');

Container.prototype = {
  update: function(fun /* args */) {
    var args = _.rest(arguments);
    var oldValue = this._value;

    this._value = fun.apply(this, construct(oldValue, args));

    return this._value;
  }
}

var aNumber = new Container(42);
console.log(aNumber); // { _value: 42 }

aNumber.update(function(n) { return n+1; });
console.log(aNumber); // { _value: 43 }

aNumber.update(function(n, x, y, z) {return n/x/y/z;}, 1, 2, 3);
console.log(aNumber); // { _value: 7.166666666666667 }

// aNumber.update(_.compose(megaCheckedSqr, always(0))); // Error: arg must not be zero

