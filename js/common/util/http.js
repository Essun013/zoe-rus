/**
 * Created by ianchen on 16/9/26.
 */
'use strict';

const localApp = require('./app');

const httpHeader = {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
};

var http = {
    post(uri, params, suc, err?: (err: Error) => void) {
        handleHttp('POST', uri, params, suc, err);
    },

    get(uri, params, suc, err?: (err: Error) => void) {
        handleHttp('GET', uri, params, suc, err);
    },

    apiPost(uri, params, suc, err?: (err: Error) => void) {
        handleHttp('POST', getUrl(uri), procArgs(params), suc, err);
    },
};

function getUrl(uri) {
    if (uri.indexOf("/") === 0)
        uri = uri.substr(1);

    return localApp.apiUrl + uri;
}

function procArgs(params) {
    let argsArray = [];
    for (var k in params)
        argsArray.push(k + '=' + params[k])

    return argsArray.join('&');
}

function handleHttp(method: string, uri: string, params, suc, err?: (err: Error) => void) {
    var header = Object.assign({}, httpHeader, {method: method});
    
    if (params)
        header.body = params;

    fetch(uri, header)
        .then((resp) => resp.json())
        .then((resp) => {
            suc(resp);
        })
        .catch((error) => {
            if (err)
                err(error);
        });
}

module.exports = http;