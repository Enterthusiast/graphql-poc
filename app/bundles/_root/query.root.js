import {
    // These are the basic GraphQL types
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLEnumType,
    // These are the GraphQL object types
    GraphQLObjectType,
    GraphQLInputObjectType,
    // This is used to create required fields and arguments
    GraphQLNonNull,
} from 'graphql';

const readEcho = require('./../echo/query/read.echo');
const readPeople = require('./../people/query/read.people');
const readPeoples = require('./../people/query/read.peoples');

const query = new GraphQLObjectType({
    name: 'RootQueries',
    fields: () => ({
        echo: readEcho,
        people: readPeople,
        peoples: readPeoples
    })
});

module.exports = query;