const assert = require('assert');
const { TestScheduler } = require('rxjs/testing');

// createHotObservable 메서드의 사용 예

//// TestScheduler 인스턴스 생성
const testScheduler = new TestScheduler(assert.deepStrictEqual);

//// a라는 값과 b라는 값을 발행한다.
testScheduler.createHotObservable('--a--b');

//// 1과 2를 발행한다.
testScheduler.createHotObservable('--a--b', { a: 1, b: 2 });

//// 특별하게 지정하지 않은 에러는 error라는 값을 발행한다.
testScheduler.createHotObservable('--#');

//// 발행할 에러를 지정하면 해당 시점에서 지정된 에러를 발행한다.
testScheduler.createHotObservable('--#', null, new Error('test'));
