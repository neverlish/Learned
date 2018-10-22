const { EMPTY, of } = require('rxjs');
const { map } = require('rxjs/operators');

of(1, -2, 3).pipe(
  map(number => number < 0 ? EMPTY : number)
)
.subscribe({
  next: v => console.log(v),
  error: e => console.log(e),
  complete: () => console.log("완료")
});

/*
1
Observable { _isScalar: false, _subscribe: [Function] }
3
완료
*/
