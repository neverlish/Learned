// 08 Chain RxJS Operators Together with a Custom `pipe` Function using Array.reduce

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
done
*/

observable$.pipe(multiply(4)).subscribe(subscriber)

/*
4
8
done
*/
