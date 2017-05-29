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

const Address = new GraphQLObjectType({
    name: 'Address',
    description: 'This represent an address',
    fields: () => ({
        street_line1: {type: GraphQLString},
        street_line2: {type: GraphQLString},
        street_line3: {type: GraphQLString},
        zip_code: {type: GraphQLString},
        city_name: {type: GraphQLString},
        region_name: {type: GraphQLString},
        state_name: {type: GraphQLString},
        country_code: {type: GraphQLString}
    })
});

module.exports.model = Address;