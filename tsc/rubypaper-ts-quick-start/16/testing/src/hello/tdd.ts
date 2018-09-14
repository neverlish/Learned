// 16-2-2 모카의 TDD와 BDD 스타일에 대한 이해 - 모카가 지원하는 TDD 스타일 - TDD 스타일의 테스트 코드

import * as mocha from 'mocha';
import hello from './hello';

var assert = require('assert');

suite('동일한 숫자인지를 테스트', function() {
  setup(function() {
    // 객체를 생성하거나 관련 변수를 초기화
  });

  suite('hello()', function() {
    test('1과 동일한지', function() {
      assert.equal(1, hello(1));
    });

    test('2과 동일한지', function() {
      assert.equal(2, hello(2));
    });

    test('3과 동일한지', function() {
      assert.equal(3, hello(3));
    });
  });
});

// mocha --ui tdd tdd.js
// mocha --ui tdd --reporter spec tdd.js
