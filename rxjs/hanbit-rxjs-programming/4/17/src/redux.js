import { Subject, BehaviorSubject, of, empty, from, Observable } from 'rxjs';
import { concatMap, scan } from 'rxjs/operators';

export function createStore(rootReducer, initialState) {
  const actionDispatcher$ = new Subject();

  const store$ = new BehaviorSubject(initialState);

  const dispatch = actionDispatcher$.next.bind(actionDispatcher$);
  const subscribe = store$.subscribe.bind(store$);
  const getState = store$.getValue.bind(store$);

  actionDispatcher$.pipe(concatMap(action => {
    if (action instanceof Promise || action instanceof Observable) {
      return from(action); // Promise 혹은 Observable이면 from 함수로 처리
    }
    if (typeof action === 'function') {
      action(dispatch, getState);
      return empty(); // 이번 액션은 무시
    }
    return of(action); // 그 외에는 scan 연산자에 action 전달
  })).pipe(scan(rootReducer, initialState))
    .subscribe(store$);

  return {
    dispatch,
    subscribe,
    getState
  };
}
