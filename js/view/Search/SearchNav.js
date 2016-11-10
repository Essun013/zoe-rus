/**
 * Created by ianchen on 16/11/2.
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import Search from './Search';
import INav from '../../components/Nav/INav';

class SearchNav extends Component {

    render() {
        return <INav route={{component: Search, title: '搜索'}} statusBarColor={'#ff4971'} barStyle={{backgroundColor: '#ff4971'}} titleCenter={true}/>
    }
}

module.exports = SearchNav;