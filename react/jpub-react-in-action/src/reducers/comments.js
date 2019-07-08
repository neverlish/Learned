import initialState from '../constants/initialState';
import * as types from '../constants/types';

export function comments(state = initialState.comments, action) {
    switch (action.type) {
        case types.comments.GET: {
            const { comments } = action;
            let nextState = Object.assign({}, state);
            for (let comment of comments) {
                if (!nextState[comment.id]) {
                    nextState[comment.id] = comment;
                }
            }
            return nextState;
        }
        case types.comments.CREATE: {
            const { comment } = action;
            let nextState = Object.assign({}, state);
            nextState[comment.id] = comment;
            return nextState;
        }
        default:
            return state;
    }
}

export function commentIds(state = initialState.commentIds, action) {
    switch (action.type) {
        case types.comments.GET: {
            const nextCommentIds = action.comments.map(comment => comment.id);
            let nextState = Array.from(state);
            for (let commentId of nextCommentIds) {
                if (!state.includes(commentId)) {
                    nextState.push(commentId);
                }
            }
            return nextState;
        }
        case types.comments.CREATE: {
            const { comment } = action;
            let nextState = Array.from(state);
            nextState.push(comment.id);
            return nextState;
        }
        default:
            return state;
    }
}
