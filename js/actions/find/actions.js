/**
 * Created by linys on 2016/10/17.
 */

'use strict';

const NAV_TEXT = 'NAV_TEXT';


/*
 * action 创建函数
 */
function navText(text) {
    return { type: NAV_TEXT, text }
}

module.exports = {
    NAV_TEXT,
    navText,
}

