/**
 * Created by ianchen on 2016/10/17.
 */

import {combineReducers} from 'redux';

const home = require('./home/reducers');

module.exports = {
    ...home
}