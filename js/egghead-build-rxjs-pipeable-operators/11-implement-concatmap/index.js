// 11 Implement RxJS `concatMap` by Waiting for Inner Subscriptions to Complete

// browserify index.js -o bundle.js

const { fromEvent, of, Subscriber } = require('rxjs')
const { scan, delay, concatMap } = require('rxjs/operators')

class MyConcatMapSubscriber extends Subscriber {
  
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
    this.buffer = []
  }

  _next(value) {
    const { isStopped } = this.innerSubscription || { isStopped: true }

    if (!isStopped) {
      this.buffer = [...this.buffer, value]
    } else {
      const o$ = this.fn(value)

      this.innerSubscription = o$.subscribe({
        next: value => {
          this.destination.next(value)
        },
        complete: () => {
          console.log(this.buffer)
          if (this.buffer.length) {
            const [first, ...rest] = this.buffer
            this.buffer = rest
            this._next(first)
          }
        }
      })
    }
  }
}

const myConcatMap = fn => source => 
  source.lift({
    call(sub, source) {
      source.subscribe(new MyConcatMapSubscriber(sub, fn))
    }
  })

const observable$ = fromEvent(
  document,
  'click'
).pipe(
  scan(i => i + 1, 0),
  myConcatMap(value => of(value).pipe(delay(1000)))
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
