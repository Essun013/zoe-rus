/**
 * Created by ianchen on 16/9/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';
// import { createStore } from 'redux';
// import todoApp from './reducers/testReducers';
import {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} from './actions/testAction';

import Main from './view/Main/Main';

const {connect} = require('react-redux');
// let store = createStore(todoApp);

class Setup extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        // AlertIOS.alert('componentDidMount', JSON.stringify(this.props));
        // this.props.dispatch(addTodo({hello:'123',ha:'345'}));
    }

    render() {
        return (
            <Main />
        );
    }
}

const styles = StyleSheet.create({
});

function select(store) {
    AlertIOS.alert('select', JSON.stringify(store));

    return {
        usr: store
    };
}

function actions(dispatch) {
    // AlertIOS.alert('actions', JSON.stringify(dispatch));
    return dispatch(addTodo({hello: '123', ha: '345'}));
}

module.exports = connect()(Setup);