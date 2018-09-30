// 03 Connect a Source to a Subscriber with RxJS `pipe`

const { from, Subscriber, Observable } = require('rxjs')

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

const o$ = new Observable()
o$.source = observable$
o$.operator = {
  call(sub, source) {
    source.subscribe(new DoubleSubscriber(sub))
  }
}

o$.subscribe(subscriber)

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

observable$.subscribe(subscriber)

/*
1
2
3
4
5
done
*/

observable$
  .pipe(source => {
    // don't do it this way!
    const o$ = new Observable()
    o$.source = source
    o$.operator = {
      call(sub, source) {
        source.subscribe(new DoubleSubscriber(sub))
      }
    }
    return o$
  })
  .subscribe(subscriber)

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
