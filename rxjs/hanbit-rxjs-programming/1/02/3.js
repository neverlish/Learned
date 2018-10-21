// 서브젝트 작동의 예

const { Subject } = require('rxjs');

const subject = new Subject();

subject.subscribe({
  next: function(v) {
    console.log('ObserverA: ' + v)
  }
});

subject.subscribe({
  next: function(v) {
    console.log('ObserverB: ' + v)
  }
});

subject.next(1);
subject.next(2);

subject.complete();
subject.next(3); // 값 발행 안됨

/*
ObserverA: 1
ObserverB: 1
ObserverA: 2
ObserverB: 2
*/
