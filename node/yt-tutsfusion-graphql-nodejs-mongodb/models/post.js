import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
  },
  body: {
    type: String
  }
}, { collection: 'post', timestamps: true });

export default mongoose.model('post', postSchema);
