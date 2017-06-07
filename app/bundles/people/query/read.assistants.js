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

const embeddedKey = require('./../../../../params/embeddedkeys').people.assistants;
const easyEmbeddedData = require('./../../../utils/embedded/get.embedded').returnEmbeddedData;

const Assistant = require('./../object/assistant').model;

const readAssistants = {
    type: new GraphQLList(Assistant),
    resolve(parent) {
        return easyEmbeddedData(parent, embeddedKey)
    }
};

module.exports = readAssistants;