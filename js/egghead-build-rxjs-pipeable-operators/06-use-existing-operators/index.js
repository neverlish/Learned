// 06 Create Operators from Existing Operators in RxJS

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
3
6
9
12
15
done
*/

observable$.pipe(multiply(4)).subscribe(subscriber)

/*
4
8
12
16
20
done
*/
