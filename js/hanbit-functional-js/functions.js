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
};
