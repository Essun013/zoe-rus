/**
 * Created by ianchen on 2016/10/17.
 */

const home = require('./home/reducers');
const me= require('./me/me');
const find = require('./find/reducers');

module.exports = {
    ...home,
    ...me,
    ...find
}