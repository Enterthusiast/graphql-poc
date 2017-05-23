import {
    // These are the basic GraphQL types
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLEnumType,

    // This is used to create required fields and arguments
    GraphQLNonNull,

    // This is the class we need to create the schema
    GraphQLSchema,

    // This function is used execute GraphQL queries
    graphql
} from 'graphql';

// Back
const Query = new GraphQLObjectType({
        name: 'RootQueries',
        fields: () => ({
        echo: {
            type: GraphQLString,
            args: {
                message: {type: GraphQLString}
            },
            resolve(rootValue, args) {
                console.log(rootValue, args);
                return `received: ${args.message}`;
            }
        }
    })
});

const Schema = new GraphQLSchema({
    query: Query
});

// Front
let query = `
  query getEcho($inputMessage: String) {
    receivedMessage: echo(message: $inputMessage)
  }
`;

graphql(Schema, query, null, null, {inputMessage: 'BOUM'}).then(function(result) {
    console.log(result);
});