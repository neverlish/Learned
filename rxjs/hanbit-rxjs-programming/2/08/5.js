const { defer } = require('rxjs');
const { timeout } = require('rxjs/operators');
const fetch = require('node-fetch');

// node-fetch 라이브러리를 이용하는 timeout 연산자 사용 예
const source$ = defer(() =>
  fetch(`https://httpbin.org/delay/${parseInt(Math.random() * 5, 10)}`)
    .then(x => x.json())
);

source$.pipe(timeout(2000)).subscribe(
  x => console.log(`${JSON.stringify(x)}`),
  err => {
    console.error(`${err}`);
    process.exit(1);
  }
); 

// TimeoutError: Timeout has occurred 
// or
// {"args":{},"data":"","files":{},"form":{},"headers":{"Accept":"*/*","Accept-Encoding":"gzip,deflate","Connection":"close","Host":"httpbin.org","User-Agent":"node-fetch/1.0 (+https://github.com/bitinn/node-fetch)"},"origin":"211.192.187.65","url":"https://httpbin.org/delay/0"}
