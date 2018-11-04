import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

function createStore(rootReducer, initialState) {
  const actionDispatcher$ = new Subject();
  const store$ = actionDispatcher$
    .pipe(scan(rootReducer, initialState));
    
  return {
    dispatch: actionDispatcher$.next.bind(actionDispatcher$),
    subscribe: actionDispatcher$.subscribe.bind(actionDispatcher$),
  };
}
