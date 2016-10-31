/**
 * Created by sea35 on 2016/10/17.
 */
import React from 'react';
import {LOGIN_SYS, SET_USER} from '../../actions/me/me';

const initialState = {
    user:{},
    loginState:false
}

function editMe(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SYS:
            return Object.assign({}, state, {
                loginState:action.loginState
            });
        case SET_USER:
            return Object.assign({}, state, {
                user:action.user
            });
        default:
            return state;
    }
}

module.exports = {
    editMe
}