const { throwError, of } = require('rxjs');
const { mergeMap } = require('rxjs/operators');

of(1, -2, 3).pipe(
  mergeMap(number => number < 0 ? throwError("number는 0보다 커야한다") : of(number))
)
.subscribe({
  next: v => console.log(v),
  error: e => console.error(e),
  complete: () => console.log("완료")
});

/*
1
number는 0보다 커야한다
*/
