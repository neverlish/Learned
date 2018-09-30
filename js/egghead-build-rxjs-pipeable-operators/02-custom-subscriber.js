// 02 Extend Subscriber to Override `_next` in RxJS

const { from, Subscriber } = require('rxjs')

const observable$ = from([1, 2, 3, 4, 5])

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

class DoubleSubscriber extends Subscriber {
  _next(value) {
    console.log('value:' + value)
    this.destination.next(value * 2)
  }
}

observable$.subscribe(new DoubleSubscriber(subscriber))

/*
value:1
2
value:2
4
value:3
6
value:4
8
value:5
10
done
*/
