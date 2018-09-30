// 09 Implement RxJS `mergeMap` through inner Observables to Subscribe and Pass Values Through

// browserify index.js -o bundle.js

const { fromEvent, of, Subscriber } = require('rxjs')
const { scan, delay } = require('rxjs/operators')

class MyMergeMapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    console.log(`outer`, value)
    const o$ = this.fn(value)

    o$.subscribe({
      next: value => {
        console.log(` inner`, value)
        this.destination.next(value)
      }
    })
  }
}

const myMergemap = fn => source => 
  source.lift({
    call(sub, source) {
      source.subscribe(new MyMergeMapSubscriber(sub, fn))
    }
  })

const observable$ = fromEvent(
  document,
  'click'
).pipe(
  scan(i => i + 1, 0),
  myMergemap(value => of(value).pipe(delay(500)))
)

const subscriber = {
  next: value => {
    console.log(value)
  },
  complete: value => {
    console.log('done')
  },
  error: value => {
    console.log(value)
  }
}

observable$.subscribe(subscriber)
