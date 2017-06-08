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

const easyFetchPeoples = require('./../fetch/get.people.js').collection;

const readPeoples = {
    type: new GraphQLList(People),
    args: {
        count: {type: GraphQLInt}
    },
    resolve(parent, args) {
        return easyFetchPeoples(args.count);
    }
};

module.exports = readPeoples;