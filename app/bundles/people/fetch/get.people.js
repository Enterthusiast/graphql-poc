const domains = require('./../../../../params/domains');
const easyFetch = require('./../../../utils/fetch/get');

module.exports.model = function(uuid) {
    return easyFetch.fromUrl(domains.people + '/' + uuid);
};

module.exports.collection = function(count = 10) {
    return easyFetch.fromUrl(domains.people + '?limit=' + count);
};