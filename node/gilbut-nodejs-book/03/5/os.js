const os = require('os');

console.log('운영체제 정보--------------');
console.log('os:arch():', os.arch());
console.log('os:platform():', os.platform());
console.log('os:type():', os.type());
console.log('os:uptime():', os.uptime());
console.log('os:hostname():', os.hostname());
console.log('os:release():', os.release());

console.log('경로---------');
console.log('os:homedir():', os.homedir());
console.log('os:tmpdir():', os.tmpdir());

console.log('cpu 정보-----------');
console.log('os:cpus():', os.cpus());
console.log('os:cpus().length:', os.cpus().length);

console.log('메모리 정보-----------');
console.log('os:freemem():', os.freemem());
console.log('os:totalmem():', os.totalmem());

/*
운영체제 정보--------------
os:arch(): x64
os:platform(): darwin
os:type(): Darwin
os:uptime(): 28309
os:hostname(): Jinhoui-MacBook-Pro.local
os:release(): 17.6.0
경로---------
os:homedir(): /Users/jinhohyeon
os:tmpdir(): /var/folders/wl/g7y080m5043g1cbmnvm4mtb40000gn/T
cpu 정보-----------
os:cpus(): [ { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 3515770, nice: 0, sys: 2019940, idle: 22775230, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 323210, nice: 0, sys: 212710, idle: 27774500, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 3172080, nice: 0, sys: 1437740, idle: 23700630, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 324740, nice: 0, sys: 197450, idle: 27788210, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 3189160, nice: 0, sys: 1443050, idle: 23678220, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 324300, nice: 0, sys: 198140, idle: 27787950, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 3203670, nice: 0, sys: 1449800, idle: 23656950, irq: 0 } },
  { model: 'Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz',
    speed: 2200,
    times: { user: 323360, nice: 0, sys: 197230, idle: 27789790, irq: 0 } } ]
os:cpus().length: 8
메모리 정보-----------
os:freemem(): 251113472
os:totalmem(): 17179869184
*/
