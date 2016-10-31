/**
 * Created by linys on 2016/10/17.
 */

import React from 'react';
import {find} from '../../actions'

function findX(state = {reduxArgs: {}}, action) {
    switch (action.type) {
        case find.NAV_SHAREWITH:
            return {
                reduxArgs: {
                    shareWith: action.shareWith
                },
            }
        case find.NAV_TEXT:
            return {
                reduxArgs: {
                    text: action.text
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