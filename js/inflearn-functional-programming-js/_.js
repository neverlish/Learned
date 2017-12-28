function _filter(list, predi) {
  var new_list = [];
  _each(list, function(val) {
    if (predi(val)) new_list.push(val);
  });
  return new_list;
}

function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

function _each(list, iter) {
  var keys = _keys(list);
  // for (var i = 0; i < list.length; i++) {
  // for (var i = 0, len = _length(list); i < len; i++) {
    for (var i = 0, len = keys.length; i < len; i++) {
    // iter(list[i]);
    iter(list[keys[i]]);
  }
  return list;
}

function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2 ? fn (a, b) : function(b) { return fn(a, b); }
  }
}

function _curryr(fn) {
  return function(a, b) {
    return arguments.length == 2 ? fn(a, b) : function(b) { return fn(b, a)};
  }
}

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

var _length = _get('length');

var slice = Array.prototype.slice;

function _rest(list, num) {
  return slice.call(list, num || 1)
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val) { 
    memo = iter(memo, val);
  });
  return memo;
};

function _pipe() {
  var fns = arguments;
  return function(arg) {
    return _reduce(fns, function(arg, fn) {
      return fn(arg);
    }, arg);
  }
}

function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

var _mapr = _curryr(_map), _filterr = _curryr(_filter);

function _is_object(obj) {
  return typeof obj == 'object' && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

function _identity(val) { return val; }

// function _values(data) {
//   // return _mapr(data, function(val) { return val;})
//   return _mapr(data, _identity);
// }

var _values = _mapr(_identity)

function _find(list, predi) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    var val = list[keys[i]];
    if (predi(val)) return val;
  }
}

function _negate(func) {
  return function(val) {
    return !func(val);
  }
}


function _reject(data, predi) {
  // return _filterr(data, function(val) {
  //   return !predi(val);
  // });
  return _filterr(data, _negate(predi));
}

module.exports = {
  _filter,
  _map,
  _each,
  _curry,
  _curryr,
  _get,
  _reduce,
  _rest,
  _pipe,
  _go,
  _mapr,
  _filterr,
  _keys,
  _identity,
  _values,
  _find,
  _negate,
  _reject
}
