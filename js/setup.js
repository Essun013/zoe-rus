/**
 * Created by ianchen on 16/9/28.
 */

import React, {Component} from 'react';
import Main from './view/Main/Main';
import {anbacklsn} from './common/util'

class Setup extends Component {
    constructor(props) {
        super(props);

        // 监听 Android 的物理返回建, 全局性监听
        anbacklsn.start();
    }

    render() {
        return <Main />
    }
}

const {connect} = require('react-redux');
module.exports = connect()(Setup);