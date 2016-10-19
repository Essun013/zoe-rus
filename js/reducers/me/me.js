/**
 * Created by sea35 on 2016/10/17.
 */
import React from 'react';
import {LOGIN_SYS} from '../../actions/me/me';

const initialState = {

}

export function editMe(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SYS:
            return {
                user:action.user,
                loginState:action.loginState
            };
        default:
            return state;
    }
}

