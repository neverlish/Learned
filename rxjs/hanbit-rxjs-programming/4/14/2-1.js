const assert = require('assert');
const { range, asapScheduler } = require('rxjs');
const { map, reduce } = require('rxjs/operators');

describe('RxJS 테스트', function() {
  describe('비동기 코드 테스트', function() {
    // 테스트가 실패하는 AsapScheduler 비동기 코드
    it('asap 스케쥴러', function() {
      range(1, 5, asapScheduler)
        .pipe(map(n => n * 2), reduce((s, n) => s + n))
        .subscribe(function(x) {
          //// 비동기 코드 테스트에서 done 함수를 호출하지 않으면 잘못된 어서션이라도 테스트가 성공한다.
          assert.equal(x, -1);
        });
    });

    // 모카에게 비동기 함수 테스트임을 알려주는 예
    it('asap 스케쥴러', function(done) {
      range(1, 5, asapScheduler)
        .pipe(map(n => n * 2), reduce((s, n) => s + n))
        .subscribe(function(x) {
          assert.equal(x, -1); // Uncaught AssertionError [ERR_ASSERTION]: 30 == -1
          done();
        });
    });
  });
});
