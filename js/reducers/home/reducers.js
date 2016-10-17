/**
 * Created by ianchen on 16/9/28.
 */
'use strict';

import React from 'react';
import {home} from '../../actions'

function homeX(state = {goHome: false}, action) {
    switch (action.type) {
        case home.GO_HOME:
            return {
                reduxArgs: {
                    goHome: action.goHome
                },
            }
        case home.HIDE_MENU:
            return {
                ...state,
                reduxArgs: {
                    hideMenu: action.hideMenu
                },
            }
        default:
            return {
                reduxArgs: {
                },
            }
    }
}

module.exports = {
    homeX
}