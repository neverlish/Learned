import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose, { mongo } from 'mongoose';
import schema from './schema';

const app = express();
const PORT = 3000;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gql_db');

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  context: {
    userId: 1
  }
}))

app.get('/', (req, res) => {
  return res.json({
    msg: 'hello graphql'
  })
})

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
})
