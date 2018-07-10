import React from 'react';
import Query from 'react-apollo';
import {HOME_PAGE} from './queries';

const Home = () => <Query query={HOME_PAGE}>Home</Query>

export default Home
