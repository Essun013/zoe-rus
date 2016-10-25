/**
 * Created by ianchen on 2016/10/24.
 */

import React from 'react';
import {status} from '../../actions'

function statusX(state = {reduxArgs: {}}, action) {
    switch (action.type) {
        case status.SWITCH_HOSPITAL:
            return {
                reduxArgs: {
                    name: action.name,
                }
            }
        default:
            return {
                ...state
            }
    }
}

module.exports = {
    statusX
}