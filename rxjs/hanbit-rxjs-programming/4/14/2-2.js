const assert = require('assert');
const { interval, asyncScheduler } = require('rxjs');
const { take, map, reduce } = require('rxjs/operators');
const { TestScheduler } = require('rxjs/testing');

//// 테스트할 옵저버블 시퀀스를 테스트하기 쉽도록 테스트용 인자로 사용할 함수로 추출
function intervalSum(period = 10000, scheduler = asyncScheduler) {
  return interval(period, scheduler)
    .pipe(take(6), map(n => n * 2), reduce((s, n) => s + n));
}

describe('RxJS 테스트', function() {
  describe('비동기 코드 테스트', function() {
    // 10초마다 한 번씩 값을 발행하는 interval 함수 테스트
    this.timeout(100 * 1000);
    it('interval 함수', function(done) {
      interval(10000)
        .pipe(take(6), map(n => n * 2), reduce((s, n) => s + n))
        .subscribe(function(x) {
          assert.equal(x, 30);
          done();
        });
    });
  });

  describe('마블 테스트', function() {
    // TestScheduler의 사용 예
    it('interval 함수', function() {
      const testScheduler = new TestScheduler(assert.deepStrictEqual);

      const source$ = intervalSum(10, testScheduler);

      const expectedMarbles = '^-----(a|)'

      const expectedValues = { a: 30 };

      testScheduler.expectObservable(source$)
        .toBe(expectedMarbles, expectedValues);

      testScheduler.flush();
    });
  });
});
