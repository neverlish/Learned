setInterval(() => {
  console.log('시작');
  try {
    throw new Error('서버를 고장내주마!');
  } catch (err) {
    console.error(err);
  }
}, 1000);

/*
시작
Error: 서버를 고장내주마!
    at Timeout.setInterval [as _onTimeout] (/Users/jinhohyeon/Desktop/dev/Learned/node/gilbut-nodejs-book/03/8/error1.js:4:11)
    at ontimeout (timers.js:498:11)
    at tryOnTimeout (timers.js:323:5)
    at Timer.listOnTimeout (timers.js:290:5)
시작
Error: 서버를 고장내주마!
    at Timeout.setInterval [as _onTimeout] (/Users/jinhohyeon/Desktop/dev/Learned/node/gilbut-nodejs-book/03/8/error1.js:4:11)
    at ontimeout (timers.js:498:11)
    at tryOnTimeout (timers.js:323:5)
    at Timer.listOnTimeout (timers.js:290:5)
(계속 반복)
*/
