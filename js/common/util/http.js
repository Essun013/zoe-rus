/**
 * Created by ianchen on 16/9/26.
 */
'use strict';

const localApp = require('./app');
import request from 'superagent-bluebird-promise'
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

    apiFetch(uri, params, fetchCallback){
        var url = localApp.apiUrl + uri + procArgs(params);
        url = encodeURI(url);
        console.log("url----" + url);
        return request.get(url).then(res => {
            fetchCallback(JSON.parse(res.text), null);
        },error =>{
            fetchCallback(null, error)
        });
    },

    uploadImage(url,imgUri,imgName,callback,err){
        uploadImg(url,imgUri,imgName,callback,err);
    },

};

function getImgType(fileName) {
    var type = fileName.substring(fileName.lastIndexOf(".")+1,fileName.length);
    switch(type){
        case 'jpg':return 'image/jpeg';
        default: return 'image/'+type;
    }
}

function uploadImg(url,imgUri,imgName,callback,err){
    let formData = new FormData();
    let fileType = getImgType(imgUri);
    let file = {uri: imgUri, type: fileType, name: imgUri};

    formData.append(imgName,file);

    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'multipart/form-data',
        },
        body:formData,
    })
        .then((response) => response.text() )
        .then((responseData)=>{
            if(callback){
                callback(responseData);
            }
            console.log('responseData',responseData);
        })
        .catch((error)=>{
            if(err){
                err(error);
            }
            console.error('error',error)
        });

}

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
        if (data.code == 0)
            handleHttp(method,uri,params,callback,err);
        else
            callback(data);
    },(error)=>{
        if (err)
            err(error);
    });

}

function handleHttp(method, uri, params, callback, err?: (err: Error) => void) {
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

function fetchSearchWithKeyword(text,fetchCallback){

    var url = localApp.apiUrl + '/kb/knowledge/search?kw=' + text;
    url = encodeURI(url);
    return request.get(url).then(res => {
            fetchCallback(res.body,null)
        },error =>{
            fetchCallback(null,error)
        });

}

export default fetchSearchWithKeyword;
module.exports = http;