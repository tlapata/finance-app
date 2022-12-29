require('dotenv').config();
import { ApolloServer } from '@apollo/server';
import { Client } from "@apperate/iexjs";
import { startStandaloneServer } from '@apollo/server/standalone';
import { gql } from '@apollo/client';
import GraphQLJSON from 'graphql-type-json';

// Types definitions
const typeDefs = gql`

    scalar JSON

    type Query {
        hello: String!
    }

    type Mutation {
        quote(symbol: String!): QuoteResult!
    }

    type QuoteResult {
        change: Float!
        changePercent: Float!
        companyName: String!
        peRatio: Float!
        delayedPrice: Float
        previousClose: Float!
        symbol: String!
    }
`;

// IEX Finance API provider
const client = new Client({
    api_token: process.env.IEX_API_TOKEN, 
    version: "v1"
});
const getQuote = (symbol: string) => {
    return client.quote({symbol: "AAPL"});    
}

// Resolvers
const resolvers = {
    JSON: GraphQLJSON,

    Query: {
        hello: () => "That is my first Apollo Server.",
    },

    Mutation: {
        quote: ( _: any, {symbol}: {symbol: string} ) => {
            return getQuote(symbol);
        }
    }
}

// Apollo Server
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