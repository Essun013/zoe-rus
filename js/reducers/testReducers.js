/**
 * Created by ianchen on 16/9/28.
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AlertIOS
} from 'react-native';
import {combineReducers} from 'redux';
import {ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters} from '../actions/testAction';
const {SHOW_ALL} = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            AlertIOS.alert('hello', 'hello ha! :' + JSON.stringify(action));
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp