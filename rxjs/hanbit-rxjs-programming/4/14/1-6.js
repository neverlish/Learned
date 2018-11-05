const assert = require('assert');

// 프로미스를 리턴하는 비동기 코드 테스트
describe('비동기 코드 테스트', function() {
  describe('프로미스 테스트', function() {
    it('1초 후 resolve', function() {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve('foo');
        }, 1000)
      })
      .then(function(result) {
        assert.ok(result === 'foo');
      });
    });
  });
});
