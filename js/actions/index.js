/**
 * Created by ianchen on 2016/10/17.
 */


const me = require('./me/me');
const home = require('./home/actions');
const find = require('./find/actions');
const status = require('./status/actions');
const box = require('./box/actions');
const search = require('./search/actions');

module.exports = {
    home,
    me,
    find,
    status,
    box,
    search,
}