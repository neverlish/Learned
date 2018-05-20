import React from 'react';
import { Link } from 'react-router'; 

export default function GameCard({ game }) {
  return (
    <div className='ui card'>
      <div className='image'>
        <img src={game.cover} alt='Game Cover' />
      </div>
      <div className='content'>
        <div className='header'>{game.title}</div>
      </div>
      <div className='extra content'>
        <div className='ui two buttons'>
          <Link to={`/game/${game._id}`} className='ui basic button green'>Edit</Link>
          <Link to='' className='ui basic button red'>Delete</Link>
        </div>
      </div>
    </div>
  )
}

GameCard.propTypes = {
  game: React.PropTypes.object.isRequired
}
