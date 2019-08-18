import React from 'react';
import ArticleList from '../components/ArticleList';

export default ArticleList('Global Articles');

export const query = graphql`
  query GlobalArticles {
    allArticlesJson(filter: { topic: { eq: "global" }}) {
      edges {
        node {
          topic
          title
        }
      }
    }
  }
`