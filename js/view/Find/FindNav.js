/**
 * Created by ianchen on 16/10/8.
 */

import React, {Component} from 'react'
import Find from './Find';
import Nav from '../../components/Nav/Nav';

export default class FindNav extends Component {
    render() {
        return <Nav route={{component: Find, title: '发现'}}/>
    }
}