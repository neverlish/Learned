import State from 'crocks/State'
import assoc from 'crocks/helpers/assoc'
import constant from 'crocks/combinators/constant'
import converge from 'crocks/combinators/converge'
import liftA2 from 'crocks/helpers/liftA2'

import { liftState } from '../helpers'

const { get, modify } = State

// nextSeed :: Integer -> Integer
const nextSeed = seed =>
  (seed * 1103515245 + 12345) & 0x7fffffff

// value :: Integer -> Number
const value = seed =>
  (seed >>> 16) / 0x7fff

// normalize :: (Integer, Integer) -> Number -> Integer
const normalize = (min, max) =>
  x => Math.floor(x * (max - min)) + min

// getNextSeed :: () -> State AppState Integer
const getNextSeed = () =>
  get(({ seed }) => nextSeed(seed))

// updateSeed :: Integer -> State AppState ()
const updateSeed = seed =>
  modify(assoc('seed', seed))

// nextValue :: Integer -> State AppState Number
const nextValue = converge(
  liftA2(constant),
  liftState(value),
  updateSeed
)

// random :: () -> State AppState Number
const random = () =>
  getNextSeed()
    .chain(nextValue)

// between :: (Integer, Integer) -> State AppState Integer
const between = (min, max) =>
  random()
    .map(normalize(min, max))

// randomIndex :: a -> State Object Integer
export const randomIndex =
  x => between(0, x.length)
