const fetch = require('node-fetch');

const headers = require('./../../../params/headers');

module.exports.toUrl = function(url, key, data) {

    const body = JSON.stringify({[key]: data});

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