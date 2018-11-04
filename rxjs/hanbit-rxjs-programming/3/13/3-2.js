const { of, asapScheduler } = require('rxjs');

// AsapScheduler를 이용한 동기 및 비동기 처리 예
console.log('start');
of(1, 2, 3, asapScheduler).subscribe(x => console.log(x));
console.log(`actions length: : ${asapScheduler.actions.length}`);
console.log('end');
/*
start
actions length: : 1
end
1
2
3
*/

// AsapScheduler의 재귀 호출
console.log('start');
asapScheduler.schedule(function work(value) {
  value = value || 1;
  console.log(value);
  var selfAction = this;
  if (value < 3) {
    selfAction.schedule(value + 1);
  }
});
console.log(`actions length: : ${asapScheduler.actions.length}`);
console.log('end');
/*
start
actions length: : 1
end
1
2
3
*/
