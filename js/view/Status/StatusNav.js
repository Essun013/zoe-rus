/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react'
import Status from './Status';
import INav from '../../components/Nav/INav';

export default class StatusNav extends Component {
    render() {
        return <INav route={{component: Status, title: '状态选择'}} barStyle={{backgroundColor: '#ff5884'}} titleCenter={true} statusBarColor={'#ff5884'}/>
    }
}