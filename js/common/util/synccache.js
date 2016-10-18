/**
 * Created by sea35 on 2016/10/18.
 */
import {AsyncStorage} from 'react-native';

module.exports ={
    get: async function(key) {
        var value = await AsyncStorage.getItem(key);
        return value;
    },

    put: async function(key,value) {
        await AsyncStorage.setItem(key,value);
    },

    remove: async function(key) {
        await AsyncStorage.removeItem(key);
    },
}