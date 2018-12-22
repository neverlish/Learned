import First from 'crocks/First'
import State from 'crocks/State'

import applyTo from 'crocks/combinators/applyTo'
import assign from 'crocks/helpers/assign'
import compose from 'crocks/helpers/compose'
import curry from 'crocks/helpers/curry'
import flip from 'crocks/combinators/flip'
import map from 'crocks/pointfree/map'
import mapProps from 'crocks/helpers/mapProps'
import mreduceMap from 'crocks/helpers/mreduceMap'
import pick from 'crocks/helpers/pick'
import prop from 'crocks/Maybe/prop'
import when from 'crocks/logic/when'

const { modify, get } = State

// inc :: Number -> Number
export const inc =
  x => x + 1

// dec :: Number -> Number
export const dec =
  x => x - 1

// decOrInc :: Boolean -> Number -> Number
export const decOrInc = x =>
  x ? dec : inc

// clamp :: (Number, Number) -> Number -> Number
export const clamp = (min, max) =>
  x => Math.min(Math.max(min, x), max)

// clampAfter :: Number -> Number -> (a -> Number) -> a -> Number
export const clampAfter = curry(
  (min, max, fn) => compose(clamp(min, max), fn)
)

// over :: (String, (a -> b)) -> Object -> State Object ()
export const over = (key, fn) =>
  modify(mapProps({ [key]: fn }))

// assignBy :: ((a -> Boolean), Object) -> Object -> Object
export const assignBy = (pred, obj) =>
  when(pred, assign(obj))

// getState :: String -> State Object (Maybe a)
export const getState = key =>
  get(prop(key))

// liftState :: (a -> b) -> a -> State s b
export const liftState = fn =>
  compose(State.of, fn)

// selectState :: (String, (a -> b)) -> State Object (Maybe b)
export const selectState = (key, fn) =>
  get(compose(map(fn), prop(key)))

// getAt :: Integer -> [ a ] -> a
export const getAt =
  index => arr => arr[index]

// unsetAt :: Integer -> [ a ] -> [ a ]
export const unsetAt = index => arr =>
  arr.slice(0, index).concat(arr.slice(index + 1))

// repeat :: (Integer, a) -> [ a ]
export const repeat = (num, elem) =>
  num === 1
    ? [ elem ]
    : repeat(num - 1, elem).concat([ elem ])

// toHint :: Object -> Hint
export const toHint =
  pick([ 'color', 'shape' ])

// Action a :: { type: String, payload: a }
// Reducer :: Action a -> Maybe (State AppState ())
// ActionReducer :: Object (a -> State AppState ())

// createAction :: String -> a -> Action a
export const createAction =
  type => payload => ({ type, payload })

// createReducer :: ActionReducer -> Reducer
export const createReducer = actionReducers =>
  ({ type, payload }) =>
    prop(type, actionReducers)
      .map(applyTo(payload))

// combineReducers :: [ Reducer ] -> Reducer
export const combineReducers = flip(
  compose(mreduceMap(First), applyTo)
)
