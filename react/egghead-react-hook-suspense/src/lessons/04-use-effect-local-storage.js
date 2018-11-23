import React, { useState, useEffect } from 'react'

function Counter() {
  const initialCount = Number(window.localStorage.getItem('count') || 0)
  const [count, setCount] = useState(initialCount)
  const increment = () => setCount(count + 1)
  useEffect(
    () => {
      window.localStorage.setItem('count', count)
    }, 
    [ count ]
  )
  return <button onClick={increment}>{count}</button>
}

export default Counter
