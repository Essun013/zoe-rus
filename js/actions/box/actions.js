/**
 * Created by linys on 2016/11/1.
 */

'use strict';

const ADD_PACKAGE = 'ADD_PACKAGE';
const UN_PACKAGE = 'UN_PACKAGE';

/*
 * action 创建函数
 */
//添加待产包
function addPackage(addPackageThing){
    return { type:
        ADD_PACKAGE,
        addPackageThing ,
    }
}

//移除待产包在redux里面
function unPackage(unPackage){
    return { type:
        UN_PACKAGE,
        unPackage,
    }
}

module.exports = {
    ADD_PACKAGE,
    addPackage,
    UN_PACKAGE,
    unPackage,
}

