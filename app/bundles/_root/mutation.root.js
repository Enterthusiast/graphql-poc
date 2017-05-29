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

const createEcho = require('./../echo/mutation/create.echo.js');
const createPeople = require('./../people/mutation/create.people.js');
const updatePeople = require('./../people/mutation/update.people.js');

const mutation = new GraphQLObjectType({
    name: 'RootMutations',
    fields: () => ({
        createEcho: createEcho,
        createPeople: createPeople,
        updatePeople: updatePeople
    })
});

module.exports = mutation;