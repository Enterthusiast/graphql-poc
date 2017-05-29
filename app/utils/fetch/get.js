const fetch = require('node-fetch');

const headers = require('./../../../params/headers');

module.exports.fromUrl = function(url) {
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