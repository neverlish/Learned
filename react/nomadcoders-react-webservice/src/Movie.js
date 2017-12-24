import React, { Component } from 'react';

class Movie extends Component {
  render() {
    return (
      <div>
        <MoviePoster poster={this.props.poster}/>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

class MoviePoster extends Component {
  render() {
    return (
      <img src={this.props.poster} />
    )
  }
}

export default Movie;
