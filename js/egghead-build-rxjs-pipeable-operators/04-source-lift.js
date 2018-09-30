// 04 Use `lift` to Connect a `source` to a `subscriber` in RxJS

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

/*
don't do it this way!

const double = source => {
  const o$ = new Observable()
  o$.source = source
  o$.operator = {
    call(sub, source) {
      source.subscribe(new DoubleSubscriber(sub))
    }
  }
  return o$
}
*/

const double = source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new DoubleSubscriber(sub))
    }
  })

observable$.pipe(double).subscribe(subscriber)

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
