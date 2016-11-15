/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Home} from './Home';
import INav from '../../components/Nav/INav';

export default class HomeNav extends Component {
    render() {
        let now = new Date();
        let title = (now.getMonth() + 1) + '月' + now.getDate() + '日';
        return <INav route={{component: Home, title: title}} barStyle={{backgroundColor: '#ff4971'}} titleCenter={true} statusBarColor={'#ff4971'}/>;
    }
}