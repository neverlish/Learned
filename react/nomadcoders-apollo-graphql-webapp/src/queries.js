import gql from 'graphql-tag';

export const HOME_PAGE = gql`
  query {
    movies(limit: 50, rating: 7) {
      id
      title
      genres
    }
  }
`;
