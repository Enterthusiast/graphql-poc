const easyFetch = require('./../fetch/get').fromUrl;

const sourceLinksKey = '_links';
const sourceEmbeddedKey = '_embedded';

const returnSource = function(source, embeddedKeyList) {
    if(Array.isArray(embeddedKeyList)) {
        const fetchList = embeddedKeyList.reduce((fetchList, field) => {
            if(source[sourceLinksKey] && source[sourceLinksKey][field]) {
                fetchList.push(easyFetch(source[sourceLinksKey][field].href));
            }
            return fetchList;
        }, []);
        return Promise.all(fetchList)
            .then(fetchData => {
                fetchData.map((data, index) => {
                    if(data[sourceEmbeddedKey] && data[sourceEmbeddedKey][embeddedKeyList[index]]) {
                        source[embeddedKeyList[index]] = data[sourceEmbeddedKey][embeddedKeyList[index]];
                    } else {
                        source[embeddedKeyList[index]] = {};
                    }
                });
                return source;
            });
    } else {
        return new Promise((resolve, reject) => {
            resolve(source);
        });
    }
};

const returnEmbeddedData = function(source, embeddedKey){
    return new Promise((resolve, reject) => {
        returnSource(source, [embeddedKey])
            .then(embeddedData => {
                resolve(embeddedData[embeddedKey]);
            });
    });
};

module.exports.returnSource = returnSource;
module.exports.returnEmbeddedData = returnEmbeddedData;