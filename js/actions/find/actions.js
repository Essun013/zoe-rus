/**
 * Created by linys on 2016/10/17.
 */

'use strict';

const NAV_SHAREWITH = 'NAV_SHAREWITH';
const NAV_TEXT = 'NAV_TEXT';
/*
 * action 创建函数
 */
function navShareWith(shareWith) {
    return { type: NAV_SHAREWITH, shareWith }
}

function navText(text) {
    return { type: NAV_TEXT, text }
}

module.exports = {
    NAV_SHAREWITH,
    navShareWith,
    NAV_TEXT,
    navText
}