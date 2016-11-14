/**
 * Created by linys on 2016/11/14.
 */

'use strict';

var constant = {

    chnNumChar : ["零","一","二","三","四","五","六","七","八","九"], //汉字数字
    chnUnitChar : ["","十","百","千"],
    chnUnitSection : ["","万","亿","万亿","亿亿"],
    numChar:{ 零:0,一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9}, //阿拉伯数字
    nameValue:{十:{value:10, secUnit:false},
        百:{value:100, secUnit:false},
        千:{value:1000, secUnit:false},
        万:{value:10000, secUnit:true},
        亿:{value:100000000, secUnit:true}
    }


}

module.exports = constant;