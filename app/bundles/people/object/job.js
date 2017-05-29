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

const Job = new GraphQLObjectType({
    name: 'Job',
    description: 'This represent an job',
    fields: () => ({
        uuid: {type: GraphQLString},
        status: {type: GraphQLString},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        created_by: {type: GraphQLString},
        updated_by: {type: GraphQLString},
        title: {type: GraphQLString},
        summary: {type: GraphQLString},
        start_date: {type: GraphQLString},
        end_date: {type: GraphQLString},
        service_code: {type: GraphQLString},
    })
});

const Jobs = new GraphQLList(Job);

module.exports.model = Job;
module.exports.collection = Jobs;