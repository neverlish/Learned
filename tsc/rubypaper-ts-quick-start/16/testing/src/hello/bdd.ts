// 16-2-2 모카의 TDD와 BDD 스타일에 대한 이해 - 모카가 지원하는 BDD 스타일 - BDD 스타일의 테스트 코드

import * as mocha from 'mocha';
import hello from './hello';

var assert = require('assert');

describe('동일한 숫자인지를 테스트', function() {
  before(function() {
    // 모든 테스트가 실행되기 전에 한 번만 실행
  });

  after(function() {
    // 모든 테스트를 끝마친 후 한 번만 실행
  });

  beforeEach(function() {
    // 각 테스트가 실행되기 전마다 수행
  });

  afterEach(function() {
    // 각 테스트가 실행된 후마다 수행
  });

  describe('hello()', function() {
    it('1과 동일한지', function() {
      assert.equal(1, hello(1));
    });

    it('2과 동일한지', function() {
      assert.equal(2, hello(2));
    });

    it('3과 동일한지', function() {
      assert.equal(3, hello(3));
    });
  })
});

// mocha bdd.js
