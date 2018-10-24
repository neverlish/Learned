const {map} = rxjs.operators;

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
