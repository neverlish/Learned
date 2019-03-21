import { NextContext } from 'next';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

export interface MyContext extends NextContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}