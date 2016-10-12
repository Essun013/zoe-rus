/**
 * Created by ianchen on 16/10/12.
 */

import React, {Component} from 'react'
import Status from './Status';
import Nav from '../../components/Nav/Nav';

export default class FindNav extends Component {
    render() {
        return <Nav route={{component: Status, title: '状态选择'}} barStyle={{backgroundColor: '#ff5884'}}/>
    }
}