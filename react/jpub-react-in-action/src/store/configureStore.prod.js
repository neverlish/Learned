import { createStore } from 'redux';

import rootReducer from '../reducers/root';

let store;
export default function configureStore(initialState) {
    if (store) {
        return store;
    }
    store = createStore(rootReducer, initialState);
    return store;
}
