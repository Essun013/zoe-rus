/**
 * Created by ianchen on 16/9/27.
 */


import React, {Component} from 'react';
// import {
//     StyleSheet,
// } from 'react-native';
import {createStore} from 'redux';
import todoApp from './reducers/testReducers';
// import {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} from './actions/testAction';

var {Provider} = require('react-redux');

import Setup from './setup';

let store = createStore(todoApp);

export default class RUS extends Component {

    // componentDidMount() {
    //     store.dispatch(addTodo('123456'));
    // }

    render() {
        return (
            <Provider store={store}>
                <Setup/>
            </Provider>
        );
    }
}