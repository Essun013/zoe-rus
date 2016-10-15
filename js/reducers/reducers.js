/**
 * Created by ianchen on 16/9/28.
 */
'use strict';

import React from 'react';
import {combineReducers} from 'redux';
import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters, HIDE_MENU} from '../actions/actions';
const {SHOW_ALL} = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state = {goHome: false}, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                reduxArgs: {
                    goHome: action.goHome
                },
            }
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        case HIDE_MENU:
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

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp