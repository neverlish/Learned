import React from 'react';
import ArticleList from '../components/ArticleList';

export default ArticleList('Sports Articles');

export const query = graphql`
  query SportsArticles {
    allArticlesJson(filter: { topic: { eq: "sports" }}) {
      edges {
        node {
          topic
          title
        }
      }
    }
  }
`