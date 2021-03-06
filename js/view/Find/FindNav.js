/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import {Platform} from 'react-native';
import Find from './Find';
import INav from '../../components/Nav/INav';

export default class FindNav extends Component {
    render() {
        return <INav route={{component: Find, title: '发现'}} titleCenter={true} statusBarColor={'#ff4971'} barStyle={{backgroundColor: '#ff4971'}}/>
    }
}