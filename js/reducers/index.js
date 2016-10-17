/**
 * Created by ianchen on 2016/10/17.
 */

const home = require('./home/reducers');
import * as me from './me/me';
const find = require('./find/reducers');

module.exports = {
    ...home,
    ...me,
    ...find
}