const { BehaviorSubject } = require('rxjs');
const subject = new BehaviorSubject('start');
subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
  complete: () => console.log('observerA completed')
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log(`observerB: ${v}`),
  complete: () => console.log('observerB completed')
});

subject.complete();

setTimeout(() => {
  subject.subscribe({
    next: (v) => console.log(`observerC: ${v}`),
    complete: () => console.log('observerC completed')
  });
}, 2000);

/*
observerA: start
observerA: 1
observerA: 2
observerB: 2
observerA completed
observerB completed
observerC completed
*/
