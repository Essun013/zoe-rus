/**
 * Created by ianchen on 2016/10/24.
 */

'use strict';

const SWITCH_HOSPITAL = 'SWITCH_HOSPITAL';

function switchHospital(name) {
    return { type: SWITCH_HOSPITAL, name: name }
}

module.exports = {
    SWITCH_HOSPITAL,
    switchHospital
}