import React from 'react';
import {withRouter} from 'react-router-dom';
import {Query} from 'react-apollo';
import {MOVIE_DETAILS} from './queries';

const Detail = ({
  match: {
    params: { movieId }
  }
}) => <Query query={MOVIE_DETAILS} variables={{ movieId }}>{({ loading, error, data }) => {
  if (loading) return 'loading';
  if (error) return 'error';
  return (
    <React.Fragment>
      {data.movie.title}
      {data.movie.medium_cover_image}
      {data.movie.rating}
      {data.movie.description_intro}
    </React.Fragment>
  )
}}</Query>


export default Detail
