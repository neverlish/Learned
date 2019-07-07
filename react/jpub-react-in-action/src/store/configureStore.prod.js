import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';

import rootReducer from '../reducers/root';
import crashingReport from '../middleware/crash';

let store;
export default function configureStore(initialState) {
    if (store) {
        return store;
    }
    store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk, crashingReport)));
    return store;
}
