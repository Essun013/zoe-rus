/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import Me from './Me';
import INav from '../../components/Nav/INav';

export default class MeNav extends Component {
    render() {
        return <INav route={{component: Me, title: '我'}} titleCenter={true} statusBarColor={'#ff4971'} barStyle={{backgroundColor: '#ff4971'}}/>
    }
}