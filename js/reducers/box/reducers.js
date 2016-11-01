/**
 * Created by linys on 2016/10/17.
 */

import React from 'react';
import {box} from '../../actions';

const initialState = {
    reduxArgs: {}
}

//百宝箱
function boxX(state = initialState, action){
    switch (action.type) {
        case box.ADD_PACKAGE:
            return {
                addPackageThing: action.addPackageThing,
            }
        default:
            return {
                ...state
            }
    }

}


module.exports = {
    boxX,
}