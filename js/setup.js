/**
 * Created by ianchen on 16/9/28.
 */

import React, {Component} from 'react';
import Main from './view/Main/Main';

const {connect} = require('react-redux');

class Setup extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Main />
        );
    }
}

module.exports = connect()(Setup);