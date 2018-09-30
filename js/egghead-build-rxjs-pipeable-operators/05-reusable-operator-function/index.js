// 05 Create a Reusable Operator from Scratch in RxJS

const { from } = require('rxjs')
const { multiply } = require('./multiply')

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

observable$.pipe(multiply(3)).subscribe(subscriber)

/*
value:1
3
value:2
6
value:3
9
value:4
12
value:5
15
done
*/

observable$.pipe(multiply(4)).subscribe(subscriber)

/*
value:1
4
value:2
8
value:3
12
value:4
16
value:5
20
done
*/
