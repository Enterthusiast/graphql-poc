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

const People = require('./../object/people').model;

const easyFetchPeople = require('./../fetch/get.people.js').model;

const readPeople = {
    type: People,
    args: {
        uuid: {type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parent, args) {
        return easyFetchPeople(args.uuid);
    }
};

module.exports = readPeople;