import mongoose from 'mongoose';
import authorModel from './models/author';

const resolvers = {
  Query: {
    authors: () => {
      
    },
    author: (root, {id}) => {
      
    }
  },
  Mutation: {
    addAuthor: (root, {name, age, books}) => {
      const author = new authorModel({ age, name, books });
      return author.save();
    }
  }
}

export default resolvers;
