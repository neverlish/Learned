process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000)

setTimeout(() => {
  console.log('실행됩니다');
}, 2000);

/*
예기치 못한 에러 Error: 서버를 고장내주마!
    at Timeout.setInterval [as _onTimeout] (/Users/jinhohyeon/Desktop/dev/Learned/node/gilbut-nodejs-book/03/8/error3.js:6:9)
    at ontimeout (timers.js:498:11)
    at tryOnTimeout (timers.js:323:5)
    at Timer.listOnTimeout (timers.js:290:5)
실행됩니다
*/
