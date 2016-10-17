/**
 * Created by linys on 2016/10/17.
 */

'use strict';

const NAV_SHARE = 'NAV_SHARE';

/*
 * action 创建函数
 */
function navShare(component) {
    return { type: NAV_SHARE, component }
}

module.exports = {
    NAV_SHARE,
    navShare
}