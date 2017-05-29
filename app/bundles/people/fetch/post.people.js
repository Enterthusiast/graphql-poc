const fetch = require('node-fetch');

const postkeys = require('./../../../../params/postkeys');
const domains = require('./../../../../params/domains');

const easyPost = require('./../../../utils/fetch/post');

module.exports.model = function(data) {
    return easyPost.toUrl(domains.people, postkeys.people , data);
};