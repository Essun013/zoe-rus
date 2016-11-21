/**
 * Created by ianchen on 16/9/27.
 */

import React, {Component} from 'react';
var {Provider} = require('react-redux');

import Setup from './setup';
import createStore from './createStore';

export default class RUS extends Component {

    render() {
        return (
            <Provider store={createStore()}>
                <Setup/>
            </Provider>
        );
    }
}