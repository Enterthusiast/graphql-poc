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

const Assistants = require('./assistant').collection;
const Jobs = require('./job').collection;
const Address = require('./address').model;

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

        // Origami API Schema
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

module.exports.model = People;