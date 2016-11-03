/**
 * Created by linys on 2016/11/3.
 */

'use strict';

const GO_SEARCH = 'GO_SEARCH';


/*
 * action 创建函数
 */
//跳转搜索界面
function goSearch(goSearch) {
    return { type: GO_SEARCH, goSearch }
}

module.exports = {
    GO_SEARCH,
    goSearch,
}

