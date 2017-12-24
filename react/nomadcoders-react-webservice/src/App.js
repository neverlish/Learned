import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movies = [
  {
    title: 'Matrix',
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzc2ZThkOGItZGY5YS00MDYwLTkyOTAtNDRmZWIwMGRhYTc0L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR79,0,630,1200_AL_.jpg'
  },
  {
    title: 'Full Metal Jacket',
    poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzc2ZThkOGItZGY5YS00MDYwLTkyOTAtNDRmZWIwMGRhYTc0L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR79,0,630,1200_AL_.jpg'
  },
  {
    title: 'Oldboy',
    poster: 'https://i.ytimg.com/vi/2HkjrJ6IK5E/hqdefault.jpg'
  },
  {
    title: 'Star Wars',
    poster: 'https://heroichollywood.b-cdn.net/wp-content/uploads/2017/05/Star-Wars-saga-1-6.png?x42694'
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        {movies.map((movie) => {
          return <Movie title={movie.title} poster={movie.poster} />
        })}
      </div>
    );
  }
}

export default App;
