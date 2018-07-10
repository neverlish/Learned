import React from 'react';
import {Query} from 'react-apollo';
import {HOME_PAGE} from './queries';

const Home = () =>(
  <Query query={HOME_PAGE}>
    {({ loading, data, error }) => {
      if (loading) return 'loading';
      if (error) return 'something happened';
      return data.movies.map(movie => (
        <h2 key={movie.id}>
          {movie.title} / {movie.rating}
        </h2>
      ));
    }}
  </Query>
);

export default Home
