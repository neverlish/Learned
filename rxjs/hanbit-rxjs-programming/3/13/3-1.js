const { asyncScheduler } = require('rxjs');

// AsyncScheduler의 상속 예
asyncScheduler.schedule(function work(value) {
  value = value || 0;
  console.log('value : ' + value);
  const selfAction = this;
  selfAction.schedule(value + 1, 1000);
}, 1000);
/*
value : 0
value : 1
value : 2
value : 3
...
*/
