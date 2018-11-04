import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

function createStore(rootReducer, initialState) {
  const actionDispatcher$ = new Subject();
  const store$ = actionDispatcher$
    .pipe(scan(rootReducer, initialState));
  
  let latestState = initialState;
  store$.subscribe(state => (latestState = state));

  return {
    dispatch: actionDispatcher$.next.bind(actionDispatcher$),
    subscribe: store$.subscribe.bind(store$),
    getState: () => latestState
  };
}
