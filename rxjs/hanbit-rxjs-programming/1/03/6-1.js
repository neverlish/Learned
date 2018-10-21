// interval 함수 사용
const { interval } = require('rxjs');
interval(1000).subscribe(x => console.log(x));

/*
0
1
2
...
*/
