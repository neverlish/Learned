const { interval, Subject } = require('rxjs');
const { take, multicast } = require('rxjs/operators');

// connect 함수로 서브젝트와 연결
const sourceObservable$ = interval(500).pipe(take(5));
const multi = sourceObservable$.pipe(multicast(() => new Subject()));

const subscribeOne = multi.subscribe(val => console.log(val));
const subscribeTwo = multi.subscribe(val => console.log(val));

multi.connect();
/*
0
0
1
1
2
2
3
3
4
4
*/

// multicast 연산자의 서브젝트 구독 확인
const subject = new Subject();
const sourceObservable2$ = interval(500).pipe(take(5));
const multi2 = sourceObservable$.pipe(multicast(() => subject));
// const multi2 = sourceObservable$.pipe(multicast(subject));
const subscribe2One = multi2.subscribe(val => console.log(val));
const subscribe2Two = multi2.subscribe(val => console.log(val));

subject.next(1);
/*
1
1
*/
