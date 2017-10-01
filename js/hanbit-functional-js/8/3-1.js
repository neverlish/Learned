// 8 흐름 기반 프로그래밍 - 3 데이터 흐름과 제어 흐름 - 1 공통 모양 찾기

var _ = require('underscore');
var {sqr, note, actions} = require('../functions');

function mSqr() {
  return function(state) {
    var ans = sqr(state);
    return {answer: ans, state: ans};
  }
}

var doubleSquareAaction = actions(
  [mSqr(), mSqr()],
  function(values) { return values; }
);

console.log(doubleSquareAaction(10)); // [100, 10000]

function mNote() {
  return function(state) {
    note(state);
    return {answer: undefined, state: state};
  }
}

function mNeg() {
  return function(state) {
    return {answer: -state, state: -state};
  }
}

var negativeSqrAction = actions(
  [mSqr(), mNote(), mNeg()],
  function (_, state) { return state; }
);

console.log(negativeSqrAction(9));
/*
NOTE: 81
-81
*/
