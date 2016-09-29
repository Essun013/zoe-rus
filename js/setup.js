/**
 * Created by ianchen on 16/9/28.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AlertIOS,
    TouchableOpacity
} from 'react-native';
// import { createStore } from 'redux';
// import todoApp from './reducers/testReducers';
import {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} from './actions/testAction';

const {connect} = require('react-redux');
// let store = createStore(todoApp);

class Setup extends Component {
    constructor(props) {
        super(props);

        this.state = {usr: ''};
    }

    componentDidMount() {
        // AlertIOS.alert('componentDidMount', JSON.stringify(this.props));
        // this.props.dispatch(addTodo({hello:'123',ha:'345'}));
    }

    render() {
        const {usr} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+D or shake for dev menu

                    {JSON.stringify(this.state.usr)}
                </Text>

                <TouchableOpacity onPress={() => this.props.dispatch(addTodo({hello:'123',ha:'345'}))}>
                    <Text>123</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

function select(store) {
    AlertIOS.alert('select', JSON.stringify(store));

    return {
        usr: store
    };
}

function actions(dispatch) {
    // AlertIOS.alert('actions', JSON.stringify(dispatch));
    return dispatch(addTodo({hello:'123',ha:'345'}));
}

module.exports = connect()(Setup);