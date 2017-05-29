const fetch = require('node-fetch');

const postkeys = require('./../../../../params/postkeys');
const domains = require('./../../../../params/domains');

const easyPut = require('./../../../utils/fetch/put');

module.exports.model = function(uuid, data) {
    return easyPut.toUrl(domains.people + '/' + uuid, postkeys.people , data);
};