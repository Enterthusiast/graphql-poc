import {
    // This is the class we need to create the schema
    GraphQLSchema
} from 'graphql';

const mutation = require('./mutation.root');
const query = require('./query.root');

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
});

module.exports = schema;