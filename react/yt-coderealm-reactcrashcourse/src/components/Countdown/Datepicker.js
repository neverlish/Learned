import React from 'react'

const Datepicker = (props) =>
  <form>
    <div className='field is-grouped is-grouped-centered' style={{marginBottom: 40}}>
      <p className='control'>
        <input className='input is-medium is-rounded' type='text' placeholder='Type a date...' />
      </p>
      <p className='control'>
        <button className='button is-light is-outlined is-medium is-rounded'>
          Reset
        </button>
      </p>
    </div>
  </form>

export default Datepicker
