import React, { Component } from 'react'
import moment from 'moment';

class Datepicker extends Component {
  state = {
    date: '',
    valid: true
  }

  handleDateChange = ({ target: { value } }) => {
    const date = moment(value)

    this.setState({
      date: value,
      valid: date.isValid() && date.isAfter(moment())
    })
  }

  handleDateSubmit = e => {
    e.preventDefault()

    const { valid, date } = this.state
    
    
    valid && this.props.onDateReset(moment(this.state.date))
  }

  render() {
    const { date } = this.state

    return <form onSubmit={this.handleDateSubmit}>
      <div className='field is-grouped is-grouped-centered' style={{marginBottom: 40}}>
        <p className='control'>
          <input
            className='input is-medium is-rounded'
            type='text'
            value={date}
            onChange={this.handleDateChange}
            placeholder='Type a date...' />
        </p>
        <p className='control'>
          <button type='submit' className='button is-light is-outlined is-medium is-rounded'>
            Reset
          </button>
        </p>
      </div>
    </form>
  }
}
  

export default Datepicker
