/**
 * Created by ianchen on 2016/11/29.
 */

'use strict';

var uuid = require('uuid');

const generator = {
    ranUUID() {
        uuid().replace('-', '');
    },
    timeUUID() {
        return uuid.v1().replace('-', '');
    }
}

module.exports = generator;