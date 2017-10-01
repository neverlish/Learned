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

module.exports = {
  // ch1
  fail,
  note,
  existy,
  truthy,
  nth,
  doWhen,
  second,
};
