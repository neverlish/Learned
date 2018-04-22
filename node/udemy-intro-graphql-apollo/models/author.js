import mongoose from 'mongoose';
import uuid from 'node-uuid';

const schema = mongoose.Schema;

const authorSchema = new schema({
  id: { type: String, default: uuid.v1 },
  age: Number,
  name: String,
  books: [String]
});

const model = mongoose.model('author', authorSchema);
export default model;
