/**
 * Created by ianchen on 16/9/26.
 */
'use strict';

import {AsyncStorage, AlertIOS} from 'react-native';

var RCache = {
    put(key: String, value: String, callback?: (err: ?Error) => void) {
        AsyncStorage.setItem(key, value).then(()=> {   //成功的操作
            if (callback)
                callback(null);
        }).catch((err) => {
            if (callback)
                callback(err);
        });
    },

    get(key: String, callback: (err: ?Error, result: String) => void) {
        AsyncStorage.getItem(key).then((result) => {
            callbacl(null, result);
        }).catch((err) => {
            callbacl(err, null);
        });
    },

    remove(key: String, callback?: (err: ?Error) => void) {
        AsyncStorage.remove(key).then(() => {
            callback(null);
        }).catch((err) => {
            callback(err);
        });
    },
};

module.exports = RCache;