/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react';
import Home from './Home';
import Nav from '../../components/Nav/Nav';

export default class HomeNav extends Component {
    render() {
        let now = new Date();
        let title= (now.getMonth()+1)+'月'+now.getDate()+'日';
        return <Nav route={{component: Home, title: title}}/>;
    }
}