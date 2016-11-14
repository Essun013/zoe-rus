/**
 * Created by ianchen on 2016/10/25.
 */

'use strict';

import constant from './constant';

Date.prototype.Format = function(fmt){ //author: linys
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

const converter = {
    dateToString(date) {
        let y = date.getFullYear();
        let m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        let d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
        return y + '-' + m + '-' + d;
    },

    timeToString(date) {
        let dateString = dateToString(date);
        let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours();
        let m = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
        let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds();
        return dateString + ' ' + h + ':' + m + ':' + s;
    },

    //将数字字符串转换为格式化的日期字符串
    //例如：20160909==>>2016年09月09日    时分秒
    formatDataTimeStr(dataStr, pattern){
        if(typeof dataStr === 'string'){
            if(dataStr.length == 8){
                let  date_str = dataStr.replace(/(\d{4})(\d{2})(\d{2})/g,'$1-$2-$3');
                return new Date(date_str).Format(pattern);
            }
            return this.dateToString(new Date());
        } else {
            return '日期字符串的格式不对!'
        }
    },

    //数字转为汉字符串
    number2Word(num){
        var unitPos = 0;
        var strIns = '', chnStr = '';
        var needZero = false;
        if(num === 0){
            return constant.chnNumChar[0];
        }
        function SectionToChinese(section){ //节内转换算法
            var strIns = '', chnStr = '';
            var unitPos = 0;
            var zero = true;
            while(section > 0){
                var v = section % 10;
                if(v === 0){
                    if(!zero){
                        zero = true;
                        chnStr = constant.chnNumChar[v] + chnStr;
                    }
                }else{
                    zero = false;
                    strIns = constant.chnNumChar[v];
                    strIns += constant.chnUnitChar[unitPos];
                    chnStr = strIns + chnStr;
                }
                unitPos++;
                section = Math.floor(section / 10);
            }
            return chnStr;
        }
        while(num > 0){ //转换算法主函数
            var section = num % 10000;
            if(needZero){
                chnStr = constant.chnNumChar[0] + chnStr;
            }
            strIns = SectionToChinese(section);
            strIns += (section !== 0) ? constant.chnUnitSection[unitPos] : constant.chnUnitSection[0];
            chnStr = strIns + chnStr;
            needZero = (section < 1000) && (section > 0);
            num = Math.floor(num / 10000);
            unitPos++;
        }
        return chnStr;
    },

    //汉字转数字
    word2number(w){
        var rtn = 0;
        var section = 0;
        var number = 0;
        var secUnit = false;
        var str = w.split('');
        for(var i = 0; i < str.length; i++){
            var num = constant.numChar[str[i]];
            if(typeof num !== 'undefined'){
                number = num;
                if(i === str.length - 1){
                    section += number;
                }
            }else{
                var unit = constant.nameValue[str[i]].value;
                secUnit = constant.nameValue[str[i]].secUnit;
                if(secUnit){
                    section = (section + number) * unit;
                    rtn += section;
                    section = 0;
                }else{
                    section += (number * unit);
                }
                number = 0;
            }
        }
        return rtn + section;
    }



}

module.exports = converter;