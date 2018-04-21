import React from 'react';

export default ({data, favourites}) => {
  const namesList = favourites.map(id => {
    const { name, sex } = data[id]
    return (
      <li key={id} className={sex}>{name}</li>
    )
  })
  return (
    <div className='favourites'>
      <h4>Click on a name to shortlist it...</h4>
      <ul>
        {namesList}
      </ul>
    </div>
  )
}
