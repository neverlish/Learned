const { Observable, from } = require('rxjs');
const { mergeMap, take, last, tap, map } = require('rxjs/operators');


module.exports = function mergeSeqTake(...observables) {
  let n = observables[observables.length - 1];
  if (n instanceof Observable) {
    n = Number.POSITIVE_INFINITY;
  } else if (typeof n === 'number' && n > 0) {
    observables.pop();
  } else {
    throw TypeError('LAST parameter should be observable or positive integer');
  }

  const { length } = observables;
  const indexValueObj = [];
  let currentIndex = 0;
  return from(observables).pipe(
    mergeMap((observable, index) => observable.pipe(
      take(n),
      last(),
      tap(result => indexValueObj[index] = result),
      map(result => {
        const nextResults = [];
        while (
          currentIndex < length &&
          indexValueObj.hasOwnProperty(currentIndex)
        ) {
          nextResults.push(indexValueObj[currentIndex]);
          currentIndex++;
        }
        return nextResults;
      }),
      mergeMap(nextResults => nextResults)
    ))
  );
};
