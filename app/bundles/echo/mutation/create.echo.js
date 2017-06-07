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

const createEcho = {
    type: GraphQLString,
    args: {
        message: {type: GraphQLString}
    },
    resolve(parent, args) {
        return `received: ${args.message}`;
    }
};

module.exports = createEcho;