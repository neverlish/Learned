import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {
  state = {
    greeting: 'Hello!',
    movies: [
      {
        title: 'Matrix',
        poster: 'https://cdn.empireonline.com/jpg/70/0/0/640/480/aspectfit/0/0/0/0/0/0/c/articles/58c8989331e02c7e3baf82ee/neo-matrix-keanu-reeves.jpg'
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
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        movies: [
          {
            title: 'Trainspotting',
            poster: 'https://upload.wikimedia.org/wikipedia/en/7/71/Trainspotting_ver2.jpg'
          },
          ...this.state.movies,
        ]
      })
    }, 5000)
  }

  render() {
    return (
      <div className="App">
        {this.state.greeting}
        {this.state.movies.map((movie, index) => {
          return <Movie title={movie.title} poster={movie.poster} key={index}/>
        })}
      </div>
    );
  }
}

export default App;
