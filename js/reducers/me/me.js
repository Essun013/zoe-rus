/**
 * Created by sea35 on 2016/10/17.
 */
import React from 'react';
import {UPDATE_ME} from '../../actions/me/me';

const initialState = {}

export function editMe(state = initialState, action) {
    switch (action.type) {
        case UPDATE_ME:
            return {
                user:action.user
            };
        default:
            return state;
    }
}
