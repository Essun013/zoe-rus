/**
 * Created by ianchen on 16/9/27.
 */
'use strict';

var Dimensions = require('Dimensions');// 宽高

var device = {
    width() {
        return this.window().width;
    },

    height() {
        return this.window().height;
    },

    window() {
        return Dimensions.get('window');
    }
};

module.exports = device;