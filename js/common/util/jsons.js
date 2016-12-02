/**
 * Created by ianchen on 2016/12/2.
 */

'use strict';

var jsons = {
  length(o) {
    var i = 0;
    for (let k in o) i++;
    return i;
  }
};

module.exports = jsons;