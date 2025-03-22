// index.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Load the GraphQL schema from schema.graphql
const typeDefs = readFileSync(join(process.cwd(), 'schema.graphql'), 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,  // Enable introspection during development
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server is running at ${url}`);
