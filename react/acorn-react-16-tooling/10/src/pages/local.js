import React from 'react';
import ArticleList from '../components/ArticleList';

export default ArticleList('Local Articles');

export const query = graphql`
  query LocalArticles {
    allArticlesJson(filter: { topic: { eq: "local" }}) {
      edges {
        node {
          topic
          title
        }
      }
    }
  }
`