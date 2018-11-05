const assert = require('assert');

function asyncFunc(cb) {
  setTimeout(function() {
    cb('foo');
  }, 1000)
}

function asyncFunc2(cb) {
  setTimeout(function() {
    cb('foo');
  }, 3000)
}

describe('비동기 코드 테스트', function() {
  describe('#setTimeout', function() {
    // 잘못된 비동기 테스트의 예
    it('done 함수를 호출하지 않으면 무조건 성공', function() {
      asyncFunc(function(result) {
        assert.ok(result === 'bar');
      });
    });

    // 올바른 비동기 테스트의 예
    it('done 함수를 호출하지 않으면 무조건 성공', function(done) {
      asyncFunc(function(result) {
        assert.ok(result === 'bar'); // Uncaught AssertionError [ERR_ASSERTION]: false == true
        done();
      });
    });

    // 타임아웃 기본 설정 때문에 실패하는 테스트
    it('2초를 지나 done 함수가 호출되어 실패하는 테스트', function(done) {
      asyncFunc2(function(result) {
        assert.ok(result === 'foo'); // Timeout of 2000ms exceeded. ...
        done();
      });
    });

    // 타임아웃 시간을 늘린 비동기 함수 테스트
    it('2초를 지나 done 함수가 호출되어 실패하는 테스트', function(done) {
      this.timeout(5000);
      asyncFunc2(function(result) {
        assert.ok(result === 'foo');
        done();
      });
    });
  });
});
