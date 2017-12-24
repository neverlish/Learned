import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

const movies = [
  'Matrix',
  'Full Metal Jacket',
  'Oldboy',
  'Star Wars'
]

const movieImages = [
  'https://cdn.empireonline.com/jpg/70/0/0/640/480/aspectfit/0/0/0/0/0/0/c/articles/58c8989331e02c7e3baf82ee/neo-matrix-keanu-reeves.jpg',
  'https://images-na.ssl-images-amazon.com/images/M/MV5BNzc2ZThkOGItZGY5YS00MDYwLTkyOTAtNDRmZWIwMGRhYTc0L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR79,0,630,1200_AL_.jpg',
  'https://i.ytimg.com/vi/2HkjrJ6IK5E/hqdefault.jpg',
  'https://heroichollywood.b-cdn.net/wp-content/uploads/2017/05/Star-Wars-saga-1-6.png?x42694'
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Movie title={movies[0]} poster={movieImages[0]}/>
        <Movie title={movies[1]} poster={movieImages[1]}/>
        <Movie title={movies[2]} poster={movieImages[2]}/>
        <Movie title={movies[3]} poster={movieImages[3]}/>
      </div>
    );
  }
}

export default App;
