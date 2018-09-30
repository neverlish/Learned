const { Subscriber } = require('rxjs')

class MultiplySubscriber extends Subscriber {
  constructor(subscriber, number) {
    super(subscriber)

    this.number = number
  }

  _next(value) {
    console.log('value:' + value)
    this.destination.next(value * this.number)
  }
}

const multiply = number => source =>
  source.lift({
    call(sub, source) {
      source.subscribe(new MultiplySubscriber(sub, number))
    }
  })

module.exports = { multiply }
