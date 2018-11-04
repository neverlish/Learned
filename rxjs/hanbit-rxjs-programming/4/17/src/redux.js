import { Subject } from 'rxjs';

function createStore(rootReducer, initialState) {
  const store$ = new Subject();
  return {
    dispatch: store$.next.bind(store$),
    subscribe: store$.subscribe.bind(store$),
  };
}
