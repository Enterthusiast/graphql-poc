const easyFetch = require('./../fetch/get').fromUrl;

module.exports = function(source, embeddedList) {
    if(embeddedList) {
        const fetchList = embeddedList.reduce((fetchList, field) => {
            if(source._links && source._links[field]) {
                fetchList.push(easyFetch(source._links[field].href));
            }
            return fetchList;
        }, []);
        return Promise.all(fetchList)
            .then(fetchData => {
                fetchData.map((data, index) => {
                    if(data._embedded && data._embedded[embeddedList[index]]) {
                        source[embeddedList[index]] = data._embedded[embeddedList[index]];
                    } else {
                        source[embeddedList[index]] = {};
                    }
                });
                debugger;
                return source;
            });
    } else {
        return new Promise((resolve, reject) => {
            resolve(source);
        });
    }
};