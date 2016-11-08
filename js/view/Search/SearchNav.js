/**
 * Created by ianchen on 16/11/2.
 */

import React, {Component} from 'react';
import Search from './Search';
import INav from '../../components/Nav/INav';

class SearchNav extends Component {

    render() {
        return <INav route={{component: Search, title: '搜索'}} barStyle={{backgroundColor: '#ff5884'}} titleCenter={true}/>
    }
}

module.exports = SearchNav;