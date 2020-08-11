import React, { useState, useCallback, memo } from 'react';
import ReactDOM from 'react-dom';
import uuidv4 from 'uuid/v4'
import produce from 'immer'
import { useImmer } from 'use-immer'

import './misc/index.css'

import { getInitialState, addGift, toggleReservation, addBook, getBookDetails } from './gifts'

const Gift = memo(function Gift({ gift, users, currentUser, onReserve }) {
  return <div className={`gift ${gift.reservedBy ? 'reserved' : ''}`}>
    <img src={gift.image} alt={gift.description} />
    <div className='description'>
      <h2>{gift.description}</h2>
    </div>
    <div className='reservation'>
      {!gift.reservedBy ? (
        <button onClick={() => onReserve(gift.id)}>Reserve</button>
      ) : gift.reservedBy === currentUser.id ? (
        <button onClick={() => onReserve(gift.id)}>Unreserve</button>
      ) : (
            <span>{users[gift.reservedBy].name}</span>
          )}
    </div>
  </div>
})

function GiftList() {
  const [state, setState] = useState(() => getInitialState())
  const { users, gifts, currentUser } = state

  const handleAdd = () => {
    const description = prompt('Gift to add')
    if (description) {
      setState(state =>
        addGift(state, uuidv4(), description, `https://picsum.photos/id/${Math.round(Math.random() * 1000)}/200/200`)
      )
    }
  }

  const handleReserve = useCallback(id => {
    setState(state => toggleReservation(state, id))
  }, [])

  const handleReset = () => {
    setState(getInitialState)
  }

  const handleAddBook = async () => {
    const isbn = prompt('Enter ISBN number', '0201558025')

    if (isbn) {
      const book = await getBookDetails(isbn)
      const nextState = addBook(state, book)
      setState(nextState)
    }
  }

  return (
    <div className='app'>
      <div className='header'>
        <h1>Hi, {currentUser.name}</h1>
      </div>
      <div className='actions'>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleAddBook}>Add Book</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className='gifts'>
        {gifts.map((gift) => (
          <Gift key={gift.id} gift={gift} users={users} currentUser={currentUser} onReserve={handleReserve} />
        ))}
      </div>
    </div>
  )
}

ReactDOM.render(<GiftList />, document.getElementById('root'));