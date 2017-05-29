const graphqlHTTP = require('express-graphql');
const express = require('express');
const bodyParser = require('body-parser');

const domains = require('./../params/domains');
const schema = require('./bundles/_root/schema.root');

const app = express();
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use("/graphql", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', domains.cors);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000);