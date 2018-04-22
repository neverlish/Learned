import mongoose from 'mongoose';
import authorModel from './models/author';

const resolvers = {
  Query: {
    authors: () => {
      return authorModel.find();
    },
    author: (root, {id}) => {
      return authorModel.findOne({ id });
    }
  },
  Mutation: {
    addAuthor: (root, {name, age, books}) => {
      const author = new authorModel({ age, name, books });
      return author.save();
    },
    deleteAuthor: (root, {id}) => {
      return authorModel.remove({id: id});
    },
    updateAuthor: (root, {id, name}) => {
      return authorModel.findOneAndUpdate({ id }, { name });
    }
  }
}

export default resolvers;
