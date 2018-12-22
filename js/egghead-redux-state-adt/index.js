import log from './logger'

import reducer from './data/reducers'
import { resetGame } from './data/reducers/game'

import initialize, {
  initialState
} from './data/model/initialize'

log(
  reducer(null, resetGame())
)
