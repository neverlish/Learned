// 8 흐름 기반 프로그래밍 - 3 데이터 흐름과 제어 흐름 - 2 단순하게 액션을 만들게 하는 함수

var _ = require('underscore');
var {actions, construct, sqr, note, pipeline, polyToString} = require('../functions');

function lift(answerFun, stateFun) {
  return function(/* args */) {
    var args = _.toArray(arguments);

    return function(state) {
      var ans = answerFun.apply(null, construct(state, args));
      var s = stateFun ? stateFun(state) : ans;

      return {answer: ans, state: s};
    }
  }
}

var mSqr2 = lift(sqr);
var mNote2 = lift(note, _.identity);
var mNeg2 = lift(function(n) {return -n});

var negativeSqrActions2 = actions(
  [mSqr2(), mNote2(), mNeg2()],
  function (_, state) { return state; }
);

console.log(negativeSqrActions2(100)); 
/*
NOTE: 10000
-10000
*/

var push = lift(function(stack, e) { return construct(e, stack); });
var pop = lift(_.first, _.rest);

var stackAction = actions(
  [push(1), push(2), pop()],
  function(values, state) { return values; }
);

console.log(stackAction([])); // [ [ 1 ], [ 2, 1 ], 2 ]

pipeline(
  []
  , stackAction
  , _.chain
).each(function(elem) {
  console.log(polyToString(elem));
});
/*
[1]
[2,1]
2
*/
