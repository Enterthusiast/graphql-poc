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
const easyEmbedded = require('./../../../utils/embedded/get.embedded');

const readPeoples = {
    type: new GraphQLList(People),
    args: {
        count: {type: GraphQLInt},
        embedded: {type: new GraphQLList(GraphQLString)}
    },
    resolve(parent, args) {
        // if(args.embedded) {
        //     return easyFetchPeoples(args.count)
        //         .then(peoples => Promise.all(peoples
        //             .map(people => easyEmbedded(people, args.embedded))
        //             )
        //         );
        // } else {
            return easyFetchPeoples(args.count);
        // }
    }
};

module.exports = readPeoples;