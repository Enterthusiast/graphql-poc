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

const readEcho = {
    type: GraphQLString,
    args: {
        message: {type: GraphQLString}
    },
    resolve(rootValue, args) {
        return `received: ${args.message}`;
    }
};

module.exports = readEcho;