import { ApolloServer } from '@apollo/server';
import { config } from './config.js';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { join } from 'path';
import merge from 'deepmerge';
import { studentResolvers } from './modules/student/student.resolvers.js';
import { roomResolvers } from './modules/room/room.resolvers.js';
import { maintenanceResolvers } from './modules/maintenance/maintenance.resolvers.js';

// Combine typeDefs
const typeDefs = [
  readFileSync(join(process.cwd(), 'src/schema/base.gql'), 'utf-8'),
  readFileSync(join(process.cwd(), 'src/modules/student/student.schema.gql'), 'utf8'),
  readFileSync(join(process.cwd(), 'src/modules/room/room.schema.gql'), 'utf8'),
  readFileSync(join(process.cwd(), 'src/modules/maintenance/maintenance.schema.gql'), 'utf8'),
].join('\n');

// Merge resolvers
const resolvers = merge.all([
  studentResolvers,
  roomResolvers,
  maintenanceResolvers,
]);

const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
const { url } = await startStandaloneServer(server, { listen: { port: config.port } });

console.log(`Server is running at ${url}`);
