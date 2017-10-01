var _ = require('underscore');

// ch1

function fail(thing) { throw new Error(thing); }

function note(thing) { console.log(['NOTE:', thing].join(' ')); }

function existy(x) { return x != null; }

function truthy(x) { return (x !== false) && existy(x); }

function isIndexed(data) { return _.isArray(data) || _.isString(data); }

function nth(a, index) {
  if (!_.isNumber(index)) fail('Expected a number as the index');
  if (!isIndexed(a)) fail('Not supported on non-index type');
  if ((index < 0) || (index > a.length - 1))
    fail('Index value is out of boounds');
  
  return a[index];
}

function second(a) { return nth(a, 1); }

function doWhen(cond, action) {
  if (truthy(cond))
    return action();
  else
    return undefined;
}

// ch2

function div(x, y) { return x/y }

function complement(pred) {
  return function() {
    return !pred.apply(null, _.toArray(arguments));
  };
}

function cat() {
  var head = _.first(arguments);
  if (existy(head))
    return head.concat.apply(head, _.rest(arguments));
  else
    return [];
}

function construct(head, tail) {
  return cat([head], _.toArray(tail));
}

function mapcat(fun, coll) {
  return cat.apply(null, _.map(coll, fun));
}

function as(table, newNames) {
  return _.map(table, function(obj) {
    return rename(obj, newNames);
  });
}

function project(table, keys) {
  return _.map(table, function(obj) {
    return _.pick.apply(null, construct(obj, keys));
  });
}

function rename(obj, newNames) {
  return _.reduce(newNames, function(o, nu, old) {
    if (_.has(obj, old)) {
      o[nu] = obj[old];
      return o;
    } else {
      return o;
    }
  }, _.omit.apply(null, construct(obj, _.keys(newNames))));
}

function restrict(table, pred) {
  return _.reduce(table, function(newTable, obj) {
    if (truthy(pred(obj)))
      return newTable;
    else  
      return _.without(newTable, obj);
  }, table)
}

// ch3

function isEven(n) { return (n % 2) === 0 }

var isOdd = complement(isEven);

function plucker(FIELD) {
  return function(obj) {
    return (obj && obj[FIELD]);
  };
}

// ch4

function repeatedly(times, fun) {
  return _.map(_.range(times), fun);
}

function always(VALUE) {
  return function() {
    return VALUE;
  };
}

function doWhen(cond, action) {
  if (truthy(cond))
    return action();
  else
    return undefined;
}

function invoker (NAME, METHOD) {
  return function(target /* 인자... */) {
    if (!existy(target)) fail('Must provide a target');

    var targetMethod = target[NAME];
    var args = _.rest(arguments);

    return doWhen(
      (existy(targetMethod) && METHOD === targetMethod), 
      function() {
        return targetMethod.apply(target, args);
      }
    );
  };
}

function checker(/* 검증자 */) {
  var validators = _.toArray(arguments);

  return function(obj) {
    return _.reduce(validators, function(errs, check) {
      if (check(obj))
        return errs;
      else
        return _.chain(errs).push(check.message).value();
    }, []);
  };
}

function hasKeys() {
  var KEYS = _.toArray(arguments);

  var fun = function(obj) {
    return _.every(KEYS, function(k) {
      return _.has(obj, k);
    });
  };

  fun.message = cat(['Must have values for keys:'], KEYS).join(' ');
  return fun;
}

function validator(message, fun) {
  var f = function(/* 인자 */) {
    return fun.apply(fun, arguments);
  };

  f['message'] = message;
  return f;
}

// ch5

function dispatch(/* funs */) {
  var funs = _.toArray(arguments);
  var size = funs.length;

  return function(target /* args */) {
    var ret = undefined;
    var args = _.rest(arguments);

    for (var funIndex = 0; funIndex < size; funIndex++) {
      var fun = funs[funIndex];
      ret = fun.apply(fun, construct(target, args))

      if (existy(ret)) return ret;
    }

    return ret;
  };
}

function curry2(fun) {
  return function(secondArg) {
    return function(firstArg) {
      return fun(firstArg, secondArg);
    }
  }
}

var greaterThan = curry2(function (lhs, rhs) { return lhs > rhs });

function partial1(fun, arg1) {
  return function(/* args */) {
    var args = construct(arg1, arguments);
    return fun.apply(fun, args);
  };
}

function partial(fun /* pargs */) {
  var pargs = _.rest(arguments);
  return function(/* arguments */) {
    var args = cat(pargs, _.toArray(arguments));
    return fun.apply(fun, args);
  }
}

var zero = validator('cannot be zero', function(n) { return 0 === n; });
var number = validator('arg must be a number', _.isNumber);

function sqr(n) {
  if (!number(n)) throw new Error(number.message);
  if (zero(n)) throw new Error(zero.message);

  return n * n;
}

function condition1(/* validators */) {
  var validators = _.toArray(arguments);

  return function(fun, arg) {
    var errors = mapcat(
      function(isValid) {
        return isValid(arg) ? [] : [isValid.message];
      }, validators);
    
    if (!_.isEmpty(errors))
      throw new Error(errors.join(','));

    return fun(arg);
  }
}

var sqrPre = condition1(
  validator('arg must not be zero', complement(zero)),
  validator('arg must be a number', _.isNumber)
);

function uncheckedSqr(n) {return n * n};

var checkedSqr = partial1(sqrPre, uncheckedSqr);

var sqrPost = condition1(
  validator('result should be a number', _.isNumber),
  validator('result shoud not be zero', complement(zero)),
  validator('result should be positive', greaterThan(0))
);

var megaCheckedSqr = _.compose(partial(sqrPost, _.identity), checkedSqr);

// ch6

function cycle(times, ary) {
  if (times <= 0)
    return [];
  else
    return cat(ary, cycle(times - 1, ary));
}

function nexts(graph, node) {
  if (_.isEmpty(graph)) return [];

  var pair = _.first(graph);
  var from = _.first(pair);
  var to = pair[1];
  var more = _.rest(graph);

  if (_.isEqual(node, from))
    return construct(to, nexts(more, node));
  else
    return nexts(more, node);
}

function deepClone(obj) {
  if (!existy(obj) || !_.isObject(obj))
    return obj;
  
  var temp = new obj.constructor();
  
  for (var key in obj)
    if (obj.hasOwnProperty(key))
      temp[key] = deepClone(obj[key]);
  
  return temp;
}

function visit(mapFun, resultFun, array) {
  if (_.isArray(array))
    return resultFun(_.map(array, mapFun));
  else
    return resultFun(array);
}

function rev(arr) {
  return _.chain(arr).reverse().value();
}

function preDepth(fun, ary) {
  return visit(partial1(preDepth, fun), fun, fun(ary));
}

function influencedWithStrategy(strategy, lang, graph) {
  var results = [];

  strategy(function(x) {
    
    if (_.isArray(x) && _.first(x) === lang)
      results.push(x[1]);
    
    return x;
  }, graph);

  return results;
}

function trampoline(fun /* args */) {
  var result = fun.apply(fun, _.rest(arguments));

  while (_.isFunction(result)) {
    result = result();
  }

  return result;
}

// ch7

var rand = partial1(_.random, 1);

function generateRandomCharacter() {
  return rand(26).toString(36);
}

function skipTake(n, coll) {
  var ret = [];
  var sz = _.size(coll);

  for (var index = 0; index < sz; index += n) {
    ret.push(coll[index]);
  }

  return ret;
}

var SaferQueue = function(elems) {
  this._q = _.clone(elems);
}

function Container(init) {
  this._value = init;
}

// ch8

function pipeline(seed /* args */) {
  return _.reduce(
    _.rest(arguments),
    function(l, r) {return r(l);},
    seed
  );
}

function actions(acts, done) {
  return function (seed) {
    var init = { values: [], state: seed };

    var intermediate = _.reduce(acts, function (stateObj, action) {
      var result = action(stateObj.state);
      var values = cat(stateObj.values, [result.answer]);

      return { values: values, state: result.state };
    }, init);

    var keep = _.filter(intermediate.values, existy);

    return done(keep, intermediate.state);
  }
}

var polyToString = dispatch(
  function(s) { return _.isString(s) ? s : undefined; },
  function(s) { return _.isArray(s) ? stringifyArray(s) : undefined; },
  function(s) { return _.isObject(s) ? JSON.stringify(s) : undefined; },
  function(s) { return s.toString(); }  
)

function stringifyArray(ary) {
  return ['[', _.map(ary, polyToString).join(','), ']'].join('')
}

module.exports = {
  // ch1
  fail,
  note,
  existy,
  truthy,
  nth,
  doWhen,
  second,
  // ch2
  div,
  complement,
  cat,
  construct,
  mapcat,
  as,
  project,
  restrict,
  rename,
  // ch3
  isEven,
  isOdd,
  plucker,
  // ch4
  repeatedly,
  always,
  doWhen,
  invoker,
  checker,
  hasKeys,
  validator,
  // ch5
  dispatch,
  curry2,
  greaterThan,
  partial1,
  partial,
  condition1,
  sqr,
  zero,
  uncheckedSqr,
  checkedSqr,
  sqrPre,
  sqrPost,
  megaCheckedSqr,
  // ch6
  cycle,
  nexts,
  deepClone,
  visit,
  rev,
  preDepth, 
  influencedWithStrategy,
  trampoline,
  // ch7
  rand,
  generateRandomCharacter,
  skipTake,
  SaferQueue,
  Container,
  // ch8
  pipeline,
  actions,
  polyToString,
  stringifyArray,
};
