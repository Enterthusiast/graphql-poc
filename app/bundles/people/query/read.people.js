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
const easyEmbedded = require('./../../../utils/embedded/get.embedded');

const readPeople = {
    type: People,
    args: {
        uuid: {type: new GraphQLNonNull(GraphQLString)},
        embedded: {type: new GraphQLList(GraphQLString)}
    },
    resolve(parent, args) {
        return easyFetchPeople(args.uuid)
            .then(people => easyEmbedded(people, args.embedded));
    }
};

module.exports = readPeople;