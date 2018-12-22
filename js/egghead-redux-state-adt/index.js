import log from './logger'

import { between } from './data/model/random'

const state = {
  seed: Date.now(),
}

log(
  between(0, 200)
    .evalWith(state)  
)
