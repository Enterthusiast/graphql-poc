// Fetch
var fetch = require('node-fetch');
var btoa = require('btoa');
var FormData = require('form-data');

var credentials = require('./credentials');
var domains = require('./domains');
var postkeys = require('./postkeys');

const headers = {
    'Content-Type': 'application/json'
    , 'Authorization': 'Basic ' + btoa(credentials.logins)
};

const easyFetch = function(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {headers: headers, method: 'GET'})
            .then(response => {
                response.json()
                    .then(json => {
                        if (json._embedded && Array.isArray(json._embedded['peoples'])) {
                            resolve(json._embedded['peoples']);
                        } else {
                            resolve(json);
                        }
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const easyFetchPeople = function(uuid) {
    return easyFetch(domains.people + '/' + uuid);
};

const easyFetchPeoples = function(count = 10) {
    return easyFetch(domains.people + '?limit=' + count);
};

const easyPost = function(url, data) {

    const body = JSON.stringify({[postkeys.people]: data});

    return new Promise((resolve, reject) => {
        fetch(url, {headers: headers, method: 'POST', body: body})
            .then(response => {
                response.json()
                    .then(json => {
                        resolve(json);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const easyPostPeople = function(data) {
    return easyPost(domains.people, data);
};

const easyPut = function(url, data) {

    const body = JSON.stringify({[postkeys.people]: data});

    return new Promise((resolve, reject) => {
        fetch(url, {headers: headers, method: 'PUT', body: body})
            .then(response => {
                response.json()
                    .then(json => {
                        resolve(json);
                    });
            })
            .catch(error => {
                reject(error);
            });
    });
};

const easyPutPeople = function(uuid, data) {
    return easyPut(domains.people + '/' + uuid, data);
};

// Graphql config
import {
    // These are the basic GraphQL types
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLEnumType,

    GraphQLInputObjectType,

    // This is used to create required fields and arguments
    GraphQLNonNull,

    // This is the class we need to create the schema
    GraphQLSchema,

    // This function is used execute GraphQL queries
    graphql
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

const InputAddress = new GraphQLInputObjectType({
    name: 'InputAddress',
    fields: {
        street_line1: {type: GraphQLString},
        street_line2: {type: GraphQLString},
        street_line3: {type: GraphQLString},
        zip_code: {type: GraphQLString},
        city_name: {type: GraphQLString},
        region_name: {type: GraphQLString},
        state_name: {type: GraphQLString},
        country_code: {type: GraphQLString}
    }
});

const People = new GraphQLObjectType({
    name: 'People',
    description: 'This represent a people',
    fields: () => ({
        uuid: {type: new GraphQLNonNull(GraphQLString)},
        status: {type: GraphQLString},

        civility: {type: GraphQLInt},
        firstname: {type: GraphQLString},
        lastname: {type: GraphQLString},

        media_url: {type: GraphQLString},
        description: {type: GraphQLString},
        has_assistants: {type: GraphQLString},

        address: {type: Address},
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
        sf_updated_at: {type: GraphQLString},
        sf_created_at: {type: GraphQLString},

        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        created_by: {type: GraphQLString},
        updated_by: {type: GraphQLString},

        // Embedded
        jobs: {type: Jobs},
        assistants: {type: Assistants},

        // "_links": {
        //     "self": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //     },
        //     "families": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/families"
        //     },
        //     "jobs": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/jobs"
        //     },
        //     "medias": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/medias"
        //     },
        //     "people_professions": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/people_professions"
        //     },
        //     "people_sectors": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/people_sectors"
        //     },
        //     "people_specialities": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/people_specialities"
        //     },
        //     "assistants": {
        //         "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/assistants"
        //     },
        //     "events": {
        //         "href": "http://dev-api.origami-event.avengersleague.com/events?people_uuid=b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //     }
        // },
        // "_embedded": {
        //     "jobs": [
        //         {
        //             "uuid": "af82b608-7cfb-4e54-906c-502707ca2ff3",
        //             "status": "ENA",
        //             "created_at": "2017-05-18T18:30:16+0200",
        //             "updated_at": "2017-05-19T14:54:25+0200",
        //             "created_by": "the system",
        //             "updated_by": "73dc30c7-5dc5-482c-bbb8-76409ececa22",
        //             "title": "&é'&é\"'&é\"'&é\"",
        //             "summary": "&é\"'&é\"'&é\"'&é\"",
        //             "start_date": "2017-05-18 00:00:00",
        //             "end_date": null,
        //             "service_code": "ACT",
        //             "_links": {
        //                 "self": {
        //                     "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/jobs/af82b608-7cfb-4e54-906c-502707ca2ff3"
        //                 },
        //                 "people": {
        //                     "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //                 },
        //                 "company": {
        //                     "href": "http://dev-api.origami-company.avengersleague.com/companies/b702ffa0-5d71-4f6a-b785-87770d135774"
        //                 },
        //                 "profession": {
        //                     "href": "http://dev-api.origami-profession.avengersleague.com/professions/12345678-1111-2222-3333-000000000567"
        //                 }
        //             },
        //             "_embedded": {
        //                 "people_job": {
        //                     "uuid": "af82b608-7cfb-4e54-906c-502707ca2ff3"
        //                 },
        //                 "company": {
        //                     "uuid": "b702ffa0-5d71-4f6a-b785-87770d135774"
        //                 },
        //                 "people": {
        //                     "uuid": "b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //                 },
        //                 "profession": {
        //                     "uuid": "12345678-1111-2222-3333-000000000567"
        //                 }
        //             }
        //         },
        //         {
        //             "uuid": "6386c325-4b4b-40c5-90ef-cc433b585b97",
        //             "status": "ENA",
        //             "created_at": "2017-05-18T18:30:43+0200",
        //             "updated_at": "2017-05-18T18:30:43+0200",
        //             "created_by": "the system",
        //             "updated_by": "73dc30c7-5dc5-482c-bbb8-76409ececa22",
        //             "title": "tttt",
        //             "summary": "ttttytytytyyty",
        //             "start_date": "2017-05-18 00:00:00",
        //             "end_date": null,
        //             "service_code": "CRH",
        //             "_links": {
        //                 "self": {
        //                     "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783/jobs/6386c325-4b4b-40c5-90ef-cc433b585b97"
        //                 },
        //                 "people": {
        //                     "href": "http://dev-api.origami-people.avengersleague.com/people/b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //                 },
        //                 "company": {
        //                     "href": "http://dev-api.origami-company.avengersleague.com/companies/4671af8e-dd13-472c-9efa-92621a7a99f7"
        //                 },
        //                 "profession": {
        //                     "href": "http://dev-api.origami-profession.avengersleague.com/professions/12345678-1111-2222-3333-000000000402"
        //                 }
        //             },
        //             "_embedded": {
        //                 "people_job": {
        //                     "uuid": "6386c325-4b4b-40c5-90ef-cc433b585b97"
        //                 },
        //                 "company": {
        //                     "uuid": "4671af8e-dd13-472c-9efa-92621a7a99f7"
        //                 },
        //                 "people": {
        //                     "uuid": "b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //                 },
        //                 "profession": {
        //                     "uuid": "12345678-1111-2222-3333-000000000402"
        //                 }
        //             }
        //         }
        //     ],
        //     "people": {
        //         "uuid": "b9b8a59c-d036-4666-bd8f-8a64c2ee5783"
        //     }
        // }
    })
});

const mutation = new GraphQLObjectType({
    name: 'RootMutations',
    fields: () => ({
        createEcho: {
            type: GraphQLString,
            args: {
                message: {type: GraphQLString}
            },
            resolve(rootValue, args) {
                return `received: ${args.message}`;
            }
        },
        createPeople: {
            type: People,
            args: {
                status: {type: new GraphQLNonNull(GraphQLString)},
                civility: {type: new GraphQLNonNull(GraphQLInt)},
                firstname: {type: new GraphQLNonNull(GraphQLString)},
                lastname: {type: new GraphQLNonNull(GraphQLString)},

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
                return easyPostPeople(args).then(people => {
                    return people;
                });
            }
        },
        updatePeople: {
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
        }
    })
});

const query = new GraphQLObjectType({
    name: 'RootQueries',
    fields: () => ({
        echo: {
            type: GraphQLString,
            args: {
                message: {type: GraphQLString}
            },
            resolve(rootValue, args) {
                return `received: ${args.message}`;
            }
        },
        people: {
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
        },
        peoples: {
            type: new GraphQLList(People),
            args: {
                count: {type: GraphQLInt}
            },
            resolve(rootValue, args) {
                return easyFetchPeoples(args.count);
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: query,
    mutation: mutation
});

// Server
const graphqlHTTP = require('express-graphql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "authorization, content-type");
    next();
});
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000);

// Front
// let query = `
//   query getEcho($inputMessage: String) {
//     receivedMessage: echo(message: $inputMessage)
//   }
// `;
//
// graphql(schema, query, null, null, {inputMessage: 'BOUM'}).then(function(result) {
//     console.log(result);
// });