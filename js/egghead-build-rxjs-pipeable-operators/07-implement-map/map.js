const { Subscriber } = require('rxjs')

class MapSubscriber extends Subscriber {
  constructor(sub, fn) {
    super(sub)
    
    this.fn = fn
  }

  _next(value) {
    this.destination.next(this.fn(value))
  }
}

const map = fn => source => 
  source.lift({
    call(sub, source) {
      source.subscribe(new MapSubscriber(sub, fn))
    }
  })

module.exports = { map }
