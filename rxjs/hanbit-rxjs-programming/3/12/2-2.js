const { interval, zip, timer, Subject } = require('rxjs');
const { take, mergeMap, tap, multicast } = require('rxjs/operators');

// 같은 옵저버블을 두 번 구독할 때 multicast 연산자를 사용 안 함
interval(1500).pipe(take(6)).subscribe(x => console.log(`${(x+1) * 1500}ms elapsed`));

const sourceObservable$ = interval(1500).pipe(
  take(5),
  tap(x => console.log(`tap ${x}`))
);

zip(sourceObservable$, sourceObservable$, (a, b) => a + ',' + b)
  .subscribe(val => console.log('value : ' + val));
/*
1500ms elapsed
tap 0
tap 0
value : 0,0
3000ms elapsed
tap 1
tap 1
value : 1,1
4500ms elapsed
tap 2
tap 2
value : 2,2
6000ms elapsed
tap 3
tap 3
value : 3,3
7500ms elapsed
tap 4
tap 4
value : 4,4
9000ms elapsed
*/

// 멀티캐스팅할 때 서브젝트 안에 있는 선택자 함수 이용
const multi = sourceObservable$.pipe(
  multicast(
    () => new Subject(),
    subject => zip(subject, subject, (a, b) => a + ',' + b)
  )
);

multi.subscribe(val => console.log('value : ' + val));
/*
1500ms elapsed
tap 0
value : 0,0
3000ms elapsed
tap 1
value : 1,1
4500ms elapsed
tap 2
value : 2,2
6000ms elapsed
tap 3
value : 3,3
7500ms elapsed
tap 4
value : 4,4
9000ms elapsed
*/
