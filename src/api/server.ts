import { ApolloServer } from 'apollo-server';
import { context } from './context';
import { schema } from './schema';

export const createNewServer = (): ApolloServer =>
  new ApolloServer({
    schema,
    context,
    playground: true,
    // tracing: isDev(),
    introspection: true,
    // debug: isDev(),
    cors: true,
  });
