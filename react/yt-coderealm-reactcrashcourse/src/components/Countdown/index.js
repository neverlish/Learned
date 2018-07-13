import React, { Component } from 'react'
import Timer from './Timer'
import moment from 'moment'
import Controls from './Controls'
import Datepicker from './Datepicker'
import HolidaysModal from './HolidaysModal'

export default class Countdown extends Component {
  state = {
    currentDate: moment(),
    nextDate: moment({year: moment().year() + 1}),
    paused: false,
    showHolidays: false
  }

  componentDidMount() {
    this.resume()
  }

  componentWillUnmount() {
    this.pause()
  }

  getRemainingTime() {
    let { currentDate, nextDate } = this.state,
        diff = nextDate.diff(currentDate)

    return moment.duration(diff)
  }

  handlePausedToggle = () => {
    this.setState((prevState) => {
      const paused = !prevState.paused

      if (paused) {
        this.pause()
      } else {
        this.resume()
      }

      return {
        paused
      }
    })
  }

  pause() {
    clearInterval(this.interval)
  }

  resume() {
    this.interval = setInterval(() => {
      this.setState({
        currentDate: moment()
      })
    }, 1000)
  }

  handleDateReset = nextDate => {
    this.setState({
      nextDate
    })
  }

  handleHolidaysToggle = () => {
    this.setState({
      showHolidays: !this.state.showHolidays
    })
  }

  render() {
    const { paused, nextDate, showHolidays } = this.state,
          duration = this.getRemainingTime()

    return <section className='hero is-dark is-bold is-fullheight has-text-centered'>
      <div className='hero-body'>
        <div className='container'>
          <h1 className='title'>
            {nextDate.calendar()} is Coming Up!
            <button
              className='button is-small is-rounded is-light'
              style={{margin: '5px 0 0 10px'}}
              onClick={this.handleHolidaysToggle}>
              Holidays
            </button>
          </h1>
          <section className='section'>
            <Timer duration={duration} />
          </section>

          <Datepicker onDateReset={this.handleDateReset}/>

          <Controls paused={paused} onPausedToggle={this.handlePausedToggle} />

          <HolidaysModal active={showHolidays} onToggle={this.handleHolidaysToggle}/>
        </div>
      </div>
    </section>
  }
}
