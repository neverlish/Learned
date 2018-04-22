import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './schema';
import mongoose from 'mongoose';

const server = express();

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

mongoose.connect('mongodb://localhost/graphqlTutorial');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('connection to database was successful');
});

server.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

server.listen(4000, () => {
  console.log('listening on port 4000');
});
