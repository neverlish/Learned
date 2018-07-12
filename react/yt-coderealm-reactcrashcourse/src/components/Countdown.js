import React, { Component } from 'react'
import moment from 'moment'

export default class Countdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: this.getRemainingTime()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        duration: this.getRemainingTime()
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  getRemainingTime() {
    let now = moment(),
        newYear = moment({year: now.year() + 1}),
        diff = newYear.diff(now)

    return moment.duration(diff)
  }

  render() {
    const { duration } = this.state

    return <section className='hero is-info is-bold is-fullheight has-text-centered'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title'>
            New Year is Coming Up!
          </h1>
          <div className='section'>
            <nav className='level'>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Days</p>
                  <p className='title'>{Math.floor(duration.asDays())}</p>
                </div>
              </div>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Hours</p>
                  <p className='title'>{duration.hours().toString().padStart(2, 0)}</p>
                </div>
              </div>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Minutes</p>
                  <p className='title'>{duration.minutes().toString().padStart(2, 0)}</p>
                </div>
              </div>
              <div className='level-item has-text-centered'>
                <div>
                  <p className='heading'>Seconds</p>
                  <p className='title'>{duration.seconds().toString().padStart(2, 0)}</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  }
}
