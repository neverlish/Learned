// 7 순수성, 불변성, 변경 정책 - 1 순수성 - 2 순수성과 비순수성 구별하기
// npm t 7/1-2

var expect = require('expect');

var {partial1, always, repeatedly, rand, generateRandomCharacter} = require('../functions');

function generateString(charGen, len) {
  return repeatedly(len, charGen).join('');
}

console.log(generateString(generateRandomCharacter, 20)); // ex) qqbnj9hnhf9khc6jgdlp

var composedRandomString = partial1(generateString, generateRandomCharacter);

console.log(composedRandomString(10)); // ex) 1oajhec9p1

///////////////

describe('generateString', function() {
  var result = generateString(always('a'), 10);

  it('should return a string of a specific length', function() {
    expect(result.constructor).toBe(String);
    expect(result.length).toBe(10);
  });

  it('should return a string congruent with its char generator', function() {
    expect(result).toEqual('aaaaaaaaaa');
  });
});
