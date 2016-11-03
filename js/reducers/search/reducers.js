/**
 * Created by linys on 16/11/3.
 */
'use strict';

import React from 'react';
import {search} from '../../actions'

function searchX(state = {goSearch: false}, action) {
    switch (action.type) {
        case search.GO_SEARCH:
            return {
                goSearch: action.goSearch
            }
        default:
            return {
                ...state,
            }
    }
}

module.exports = {
    searchX
}