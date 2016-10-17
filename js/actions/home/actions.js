/**
 * Created by ianchen on 16/9/28.
 */
'use strict';

const GO_HOME = 'GO_HOME';
const HIDE_MENU = 'HIDE_MENU'

/*
 * action 创建函数
 */
function goHome(goHome) {
    return { type: GO_HOME, goHome }
}

function hideMenu(hideMenu) {
    return { type: HIDE_MENU, hideMenu }
}

module.exports = {
    GO_HOME,
    HIDE_MENU,
    goHome,
    hideMenu
}