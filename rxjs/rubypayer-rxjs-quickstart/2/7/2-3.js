const { interval } = require('rxjs');
const { publish, refCount } = require('rxjs/operators');

const number$ = interval(1000);
/*
const connectable$ = number$.pipe(publish());

let connectSub, sub1, sub2;

sub1 = connectable$.subscribe(v => console.log(`observerA: ${v}`));
connectSub = connectable$.connect();

setTimeout(() => {
  sub2 = connectable$.subscribe(v => console.log(`observerB: ${v}`));
}, 1100);

setTimeout(() => {
  console.log(`observerA is unsubscribed`);
  sub1.unsubscribe();
}, 2100);

setTimeout(() => {
  console.log(`observerB is unsubscribed`);
  sub2.unsubscribe();
  console.log(`connectableObservable is unsubscribed`);

  connectSub.unsubscribe(); // number$의 데이터 전송을 중지 한다.
}, 3100);

observerA: 0
observerA: 1
observerB: 1
observerA is unsubscribed
observerB: 2
observerB is unsubscribed
connectableObservable is unsubscribed

*/

const connectable$ = number$.pipe(
  publish(),
  refCount()
);

let connectSub, sub1, sub2;

sub1 = connectable$.subscribe(v => console.log(`observerA: ${v}`));

setTimeout(() => {
  sub2 = connectable$.subscribe(v => console.log(`observerB: ${v}`));
}, 1100);

setTimeout(() => {
  console.log(`observerA is unsubscribed`);
  sub1.unsubscribe();
}, 2100);

setTimeout(() => {
  console.log(`observerB is unsubscribed`);
  sub2.unsubscribe();
}, 3100);

/*
observerA: 0
observerA: 1
observerB: 1
observerA is unsubscribed
observerB: 2
observerB is unsubscribed
*/
