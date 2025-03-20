import { Client } from "@apperate/iexjs";
import GraphQLJSON from 'graphql-type-json';
import { Resolvers } from "../generated/graphql";

// IEX Finance API provider
const client = new Client({
    api_token: process.env.IEX_API_TOKEN, 
    version: "v1"
});
const getQuote = (symbol: string) => {
    return client.quote({symbol});    
}

// Resolver itself
const resolvers: Resolvers = {
    JSON: GraphQLJSON,

    Query: {
        info: () => "That is my first Apollo Server.",
    },

    Mutation: {
        quote: ( _: any, {symbol} ) => {
            return getQuote(symbol);
        }
    }
}

export default resolvers;