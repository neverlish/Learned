// 래퍼

function wrap(object, method, wrapper) {
  var fn = object[method];
  return object[method] = function() {
    return wrapper.apply(this, [fn].concat(
      // return wrapper.apply(this, [fn.bind(this)].concat()
      Array.prototype.slice.call(arguments)));
  };
}

Function.prototype.original = function(value) {
  this.value = value;
  console.log('value : ' + this.value);
}

var mywrap = wrap(Function.prototype, 'original', function(orig_func, value) {
  this.value = 20;
  orig_func(value);
  console.log('wrapper value : ' + this.value);
});

mywrap('zzoon');
// 출력
// value : zzoon
// wrapper value : 20
