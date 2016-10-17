/**
 * Created by linys on 2016/10/17.
 */

import React from 'react';
import {find} from '../../actions'

function findTodos(state, action) {
    switch (action.type) {
        case find.NAV_SHARE:
            return {
                reduxArgs: {
                    component: action.component
                },
            }
        default:
            return {
                reduxArgs: {
                    ...state
                },
            }
    }
}

module.exports = {
    findTodos
}