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

const easyFetch = require('./../../../utils/fetch/get').fromUrl;
const easyFetchPeople = require('./../fetch/get.people.js').model;

const readPeople = {
    type: People,
        args: {
        uuid: {type: new GraphQLNonNull(GraphQLString)},
        embedded: {type: new GraphQLList(GraphQLString)}
    },
    resolve(rootValue, args) {
        return easyFetchPeople(args.uuid).then(people => {
            if(args.embedded) {
                const fetchList = args.embedded.reduce((fetchList, field) => {
                    if(people._links && people._links[field]) {
                        fetchList.push(easyFetch(people._links[field].href));
                    }
                    return fetchList;
                }, []);
                return Promise.all(fetchList)
                    .then(fetchData => {
                        fetchData.map((data, index) => {
                            if(data._embedded && data._embedded[args.embedded[index]]) {
                                people[args.embedded[index]] = data._embedded[args.embedded[index]];
                            } else {
                                people[args.embedded[index]] = {};
                            }
                        });
                        debugger;
                        return people;
                    });
            } else {
                return people;
            }
        });
    }
};

module.exports = readPeople;