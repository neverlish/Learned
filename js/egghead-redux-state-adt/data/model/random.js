import State from 'crocks/State'
import assoc from 'crocks/helpers/assoc'
import composeK from 'crocks/helpers/composeK'
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
export const getNextSeed = () =>
  get(({ seed }) => nextSeed(seed))

// updateSeed :: Integer -> State AppState ()
export const updateSeed = seed =>
  modify(assoc('seed', seed))

// nextValue :: Integer -> State AppState Number
export const nextValue = converge(
  liftA2(constant),
  liftState(value),
  updateSeed
)

// random :: () -> State AppState Number
export const random =
  composeK(nextValue, getNextSeed)

// between :: (Integer, Integer) -> State AppState Integer
export const between = (min, max) =>
  random()
    .map(normalize(min, max))
