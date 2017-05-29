var btoa = require('btoa');

var credentials = require('./credentials');

module.exports = {
    'Content-Type': 'application/json'
    , 'Authorization': 'Basic ' + btoa(credentials.logins)
};