/**
 * Created by ianchen on 16/9/28.
 */

import React, {Component} from 'react';
import Main from './view/Main/Main';
import {anbacklsn} from './common/util'

const {connect} = require('react-redux');

class Setup extends Component {
    constructor() {
        super();

        // 监听 Android 的物理返回建, 全局性监听
        anbacklsn.start();
    }
    render() {
        return (
            <Main />
        );
    }
}

module.exports = connect()(Setup);