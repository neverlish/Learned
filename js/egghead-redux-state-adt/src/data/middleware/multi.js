import isSameType from 'crocks/predicates/isSameType'

export default function multiMiddleware({ dispatch }) {
  return next => action => {
    isSameType(Array, action)
      ? action.forEach(a => dispatch(a))
      : next(action)
  }
}
