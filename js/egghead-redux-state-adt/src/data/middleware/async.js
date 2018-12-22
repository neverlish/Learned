import Async from 'crocks/Async'
import compose from 'crocks/helpers/compose'
import isSameType from 'crocks/predicates/isSameType'

export const errAction = payload => ({
  type: 'ASYNC_ERROR',
  payload,
  error: true
})

export default function asyncMiddleware({ dispatch }) {
  return next => action => {
    isSameType(Async, action)
      ? action.fork(compose(next, errAction), dispatch)
      : next(action)
  }
}
