/**
 * Created by linys on 2016/11/1.
 */

'use strict';

const ADD_PACKAGE = 'ADD_PACKAGE';

/*
 * action 创建函数
 */
function addPackage(addPackageThing){
    return { type:
        ADD_PACKAGE,
        addPackageThing ,
    }
}

module.exports = {
    ADD_PACKAGE,
    addPackage,
}

