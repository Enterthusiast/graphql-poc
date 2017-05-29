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

const Assistant = new GraphQLObjectType({
    name: 'Assistant',
    description: 'This represent an assistant',
    fields: () => ({
        uuid: {type: GraphQLString},
        status: {type: GraphQLString},

        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},

        email: {type: GraphQLString},
        email_npai: {type: GraphQLString},
        phone: {type: GraphQLString},
        phone_npai: {type: GraphQLString},
        mobile: {type: GraphQLString},
        mobile_npai: {type: GraphQLString},

        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        created_by: {type: GraphQLString},
        updated_by: {type: GraphQLString},
    })
});

const Assistants = new GraphQLList(Assistant);

module.exports.model = Assistant;
module.exports.collection = Assistants;