const { merge, fromEvent } = rxjs;
const { map, partition, share, switchMap } = rxjs.operators;
const { ajax } = rxjs.ajax;

export function handleAjax(property) {
  return obs$ => obs$
    .pipe(
      map(jsonRes => {
        if (jsonRes.error) {
          if (jsonRes.error.code === '4') { // 결과가 존재하지 않는 경우
            return [];
          } else {
            throw jsonRes.error;
          }
        } else if (Array.isArray(jsonRes[property])) {
          return jsonRes[property];
        } else {
          if (jsonRes[property]) {
            return [jsonRes[property]]; // 1건만 전달된 경우 객체로 넘겨져 옮.
          } else {
            return [];
          }
        }
      })
    )
}

export function createShare$() {
  const changedHash$ = merge(
    fromEvent(window, 'load'),
    fromEvent(window, 'hashchange')
  )
  .pipe(
    map(() => parseHash()),
    share()
  );

  let [render$, search$] = changedHash$.pipe(
    partition(({ routeId }) => routeId)
  )

  render$ = render$
    .pipe(
      switchMap(({ routeId }) => ajax.getJSON(`/station/pass/${routeId}`)),
      handleAjax('busRouteStationList')
    )

  return {
    render$,
    search$
  }
}

function parseHash() {
  const [routeId, routeNum] = location.hash.substring(1).split('_');
  return {
    routeId,
    routeNum
  };
}
