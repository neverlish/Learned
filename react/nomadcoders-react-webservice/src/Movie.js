import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div>
        <MoviePoster />
        <h1>hello this is a movie</h1>
      </div>
    );
  }
}

class MoviePoster extends Component {
  render() {
    return (
      <img src='https://is2-ssl.mzstatic.com/image/thumb/Music1/v4/ac/08/3d/ac083d70-0149-0a0a-4b90-7647203edbe0/UMG_cvrart_00602547178466_01_RGB72_1500x1500_14UMGIM51157.jpg/1200x630bb.jpg' />
    )
  }
}

export default Movie;
