// 1 함수형 자바스크립트 소개 - 2 함수형 프로그래밍 시작하기 - 2 함수 - 추상화 단위

var _ = require('underscore');

var {note, fail} = require('../functions');

function parseAge(age) {
  if (!_.isString(age)) throw new Error('Expecting a string');  
  var a;
  
  console.log('Attempting to parse an age');

  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    console.log(['Could not parse age:', age].join(' '));
    a = 0;
  }

  return a;
}

console.log(parseAge('42'));
// Attempting to parse an age
// 42

// console.log(parseAge(42));
// Error: Expecting a string

console.log(parseAge('frob'));
// Could not parse age: frob
// 0

//////////

function warn(thing) {
  console.log(['WARNING:', thing].join(' '));
}

function parseAge2(age) {
  if (!_.isString(age)) fail('Expecting a string');
  var a;

  note('Attempting to parse an age');
  a = parseInt(age, 10);

  if (_.isNaN(a)) {
    warn(['Could not parse age:', age].join(' '));
    a = 0;
  }

  return a;
}

console.log(parseAge2('frob'));
// NOTE: Attempting to parse an age
// WARNING: Could not parse age: frob
// 0
