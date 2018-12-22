import State from 'crocks/State'

import compose from 'crocks/helpers/compose'
import curry from 'crocks/helpers/curry'
import mapProps from 'crocks/helpers/mapProps'

const { modify } = State

// inc :: Number -> Number
export const inc =
  x => x + 1

// dec :: Number -> Number
export const dec =
  x => x - 1

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
