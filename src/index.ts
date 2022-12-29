require('dotenv').config();
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import resolvers from './graphql/resolvers';

// Apollo Server
const typeDefs = readFileSync('./src/graphql/schema.graphql', 'utf8');
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// Starting Server
const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
}

startServer();