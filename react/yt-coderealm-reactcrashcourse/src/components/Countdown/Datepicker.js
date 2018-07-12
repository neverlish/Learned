import React, { Component } from 'react'

class Datepicker extends Component {
  state = {
    date: '2018-01-21'
  }

  handleDateChange = (e) => {
    this.setState({
      date: e.target.value
    })
  }

  handleDateSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.date)
  }

  render() {
    const { date } = this.state

    return <form onSubmit={this.handleDateSubmit}>
      <div className='field is-grouped is-grouped-centered' style={{marginBottom: 40}}>
        <p className='control'>
          <input className='input is-medium is-rounded' type='text' value={date} onChange={this.handleDateChange} placeholder='Type a date...' />
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
