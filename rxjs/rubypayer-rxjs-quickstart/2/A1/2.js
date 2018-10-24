const { ReplaySubject } = require('rxjs');
const subject = new ReplaySubject(2);

subject.subscribe({
  next: (v) => console.log(`observerA: ${v}`),
  complete: () => console.log('observerA completed')
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

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
observerA: 1
observerA: 2
observerA: 3
observerA: 4
observerB: 3
observerB: 4
observerA completed
observerB completed
observerC: 3
observerC: 4
observerC completed
*/
