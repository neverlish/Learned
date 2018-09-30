// 10 Implement RxJS `switchMap` by Canceling Inner Subscriptions as Values are Passed Through

// browserify index.js -o bundle.js

const { fromEvent, of, Subscriber } = require('rxjs')
const { scan, delay, switchMap } = require('rxjs/operators')

class MySwitchMapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)

    this.fn = fn
  }

  _next(value) {
    console.log(`outer`, value)
    const o$ = this.fn(value)

    if (this.innerSubscription) {
      this.innerSubscription.unsubscribe()
    }

    this.innerSubscription = o$.subscribe({
      next: value => {
        console.log(` inner`, value)
        this.destination.next(value)
      }
    })
  }
}

const mySwitchMap = fn => source => 
  source.lift({
    call(sub, source) {
      source.subscribe(new MySwitchMapSubscriber(sub, fn))
    }
  })

const observable$ = fromEvent(
  document,
  'click'
).pipe(
  scan(i => i + 1, 0),
  mySwitchMap(value => of(value).pipe(delay(500)))
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
