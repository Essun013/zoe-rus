/**
 * Created by ianchen on 2016/10/25.
 */

'use strict';

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
    }
}

module.exports = converter;