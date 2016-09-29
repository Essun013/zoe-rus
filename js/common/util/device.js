/**
 * Created by ianchen on 16/9/27.
 */
'use strict';

let Dimensions = require('Dimensions');// 宽高

var device = {
    width() {
        return Dimensions.get('window').width;
    },

    height() {
        return Dimensions.get('window').height;
    },

    window() {
        return Dimensions.get('window');
    }
};

module.exports = device;