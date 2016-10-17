/**
 * Created by linys on 2016/10/17.
 */

import React from 'react';
import {find} from '../../actions'

function findX(state = {reduxArgs: {}}, action) {
    switch (action.type) {
        case find.NAV_SHARE:
            return {
                reduxArgs: {
                    component: action.component
                },
            }
        default:
            return {
                ...state
            }
    }
}

module.exports = {
    findX
}