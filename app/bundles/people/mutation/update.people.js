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
const InputAddress = require('./../object/input-address').model;

const easyPutPeople = require('./../fetch/put.people.js').model;

const updatePeople = {
    type: People,
        args: {
        uuid: {type: new GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLString},
        civility: {type: GraphQLInt},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},

        description: {type: GraphQLString},

        address: {
            type: InputAddress,
                args: {
                street_line1: {type: GraphQLString},
                street_line2: {type: GraphQLString},
                street_line3: {type: GraphQLString},
                zip_code: {type: GraphQLString},
                city_name: {type: GraphQLString},
                region_name: {type: GraphQLString},
                state_name: {type: GraphQLString},
                country_code: {type: GraphQLString}
            }
        },
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
    resolve(rootValue, args) {
        const uuid = args.uuid;
        delete args.uuid;
        const data = args;
        return easyPutPeople(uuid, args).then(people => {
            return people;
        });
    }
};

module.exports = updatePeople;