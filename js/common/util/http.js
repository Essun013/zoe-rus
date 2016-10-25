/**
 * Created by ianchen on 16/9/26.
 */
'use strict';

const localApp = require('./app');
import DeviceInfo from 'react-native-device-info';

const httpHeader = {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'commons-session-id':DeviceInfo.getUniqueID()
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
function login(method,uri,params,callback,err) {
    let curParams = {
        username: DeviceInfo.getUniqueID(),
        password: 1
    }
    http.apiPost('/uc/user/sign-in', curParams, (data)=> {
        handleHttp(method,uri,params,callback,err);
    },(error)=>{
        if (err)
            err(error);
    });

}
function handleHttp(method: string, uri: string, params, callback, err?: (err: Error) => void) {
    var header = Object.assign({}, httpHeader, {method: method});
    
    if (params)
        header.body = params;

    fetch(uri, header)
        .then((resp) => resp.json())
        .then((resp) => {
            if(resp.code && resp.code==4191){
                login(method,uri,params,callback,err)
            }
            else{
                callback(resp);
            }
        })
        .catch((error) => {
            if (err)
                err(error);
        });
}

module.exports = http;