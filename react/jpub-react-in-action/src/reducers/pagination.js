import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function pagination(state = initialState.pagination, action) {
    switch (action.type) {
        case types.posts.UPDATE_LINKS:
            const nextState = Object.assign({}, state);
            for (let k in action.links) {
                if (action.links.hasOwnProperty(k)) {
                    if (process.env.NODE_ENV === 'production') {
                        nextState[k] = action.links[k].url.replace(/http:\/\//, 'https://');
                    } else {
                        nextState[k] = action.links[k].url;
                    }
                }
            }
            return nextState;
        default:
            return state;
    }
}
