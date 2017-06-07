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
const updateAddress = require('./update.address');

const easyPostPeople = require('./../fetch/post.people').model;

const createPeople = {
    type: People,
    args: {
        status: {type: new GraphQLNonNull(GraphQLString)},
        civility: {type: new GraphQLNonNull(GraphQLInt)},
        firstname: {type: new GraphQLNonNull(GraphQLString)},
        lastname: {type: new GraphQLNonNull(GraphQLString)},

        description: {type: GraphQLString},

        address: updateAddress,
        address_npai: {type: GraphQLString},

        email: {type: GraphQLString},
        email_npai: {type: GraphQLString},
        email_spam: {type: GraphQLString},

        phone: {type: GraphQLString},
        phone_npai: {type: GraphQLString},

        mobile: {type: GraphQLString},
        mobile_npai: {type: GraphQLString},

        linkedin_id: {type: GraphQLString},
        twitter_id: {type: GraphQLString},
        facebook_id: {type: GraphQLString},
        google_id: {type: GraphQLString},

        alice_id: {type: GraphQLString},
        sf_id: {type: GraphQLString},
    },
    resolve(parent, args) {
        return easyPostPeople(args).then(people => {
            return people;
        });
    }
};

module.exports = createPeople;