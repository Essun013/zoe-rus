/**
 * Created by ianchen on 16/9/28.
 */
'use strict';

import React from 'react';
import {combineReducers} from 'redux';
import {home} from '../../actions'

function todos(state = {goHome: false}, action) {
    switch (action.type) {
        case home.GO_HOME:
            return {
                reduxArgs: {
                    goHome: action.goHome
                },
            }
        case home.HIDE_MENU:
            return {
                reduxArgs: {
                    ...state,
                    hideMenu: action.hideMenu
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

// const todoApp = combineReducers({
//     todos
// })

module.exports = {
    todos
}