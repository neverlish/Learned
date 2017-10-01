// 7 순수성, 불변성, 변경 정책 - 1 순수성 - 3 비순수한 함수의 프로퍼티 테스트
// npm t 7/1-3

var _ = require('underscore');
var expect = require('expect');

var {repeatedly, generateRandomCharacter} = require('../functions');

describe('generateRandomCharacter', function() {
  var result = repeatedly(10000, generateRandomCharacter);
  
  it('should return only string of length 1,', function() {
    expect(_.every(result, _.isString)).toBeTruthy();
    expect(_.every(result, function(s) { return s.length === 1 })).toBeTruthy();
  });

  it('should return a string of only lowercase ASCII letters or digits', function() {
    expect(_.every(result, function(s) {
      return /[a-z0-9]/.test(s)
    })).toBeTruthy();
    expect(_.any(result, function(s) {
      return /[A-Z]/.test(s)
    })).toBeFalsy();
  });
});
