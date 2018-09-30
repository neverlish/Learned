// 01 Create a Generic Subscriber in RxJS

const { from } = require('rxjs')

const observable$ = from([1, 2, 3, 4, 5])

// observable$.subscribe(value => {
//   console.log(value);
// });

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

/*
1
2
3
4
5
done
*/
